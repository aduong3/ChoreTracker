import Users from "../models/userModel.js";
import ErrorHandler from "../services/ErrorHandler.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };
  // if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

export default function usersController() {
  async function createNewUser(req, res, next) {
    try {
      const { name, email, password, passwordConfirm } = req.body;

      const user = await Users.create({
        name,
        email,
        password,
        passwordConfirm,
      });

      createSendToken(user, 201, res);
    } catch (err) {
      return next(
        new ErrorHandler(
          "Could not create account. Please double check the information.",
          400,
        ),
      );
    }
  }
  async function logUserIn(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password)
        return next(
          new ErrorHandler("Please put an email and/or password", 400),
        );

      const user = await Users.findOne({ email }).select("+password");

      if (!user || !(await user.checkPassword(password, user.password))) {
        // Or if the password inputted !== password in database
        return next(new ErrorHandler("Incorrect email or password", 401));
      }
      createSendToken(user, 200, res);
    } catch (err) {
      return next(new ErrorHandler(err.message, 400));
    }
  }

  async function logUserOut(req, res) {
    try {
      res.clearCookie("jwt", { path: "/", sameSite: "None", secure: true });
      res.status(200).json({
        status: "success",
        message: "User is now logged out.",
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: "User failed to log out.",
      });
    }
  }

  async function protectRoute(req, res, next) {
    try {
      let token;
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
      } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
      }

      if (!token) return next(new ErrorHandler("You are not logged in!", 401));

      const decodedToken = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET,
      );

      const currentUser = await Users.findById(decodedToken.id);

      if (!currentUser) {
        return next(new ErrorHandler("This user does not exist!", 401));
      }

      if (currentUser.changedPasswordAfter(decodedToken.iat)) {
        return next(
          new ErrorHandler(
            "Recently changed passwords. Please log in once again.",
            401,
          ),
        );
      }

      req.user = currentUser;
      next();
    } catch (err) {
      return next(new ErrorHandler(err.message, 401));
    }
  }

  function checkAuthStatus(req, res) {
    try {
      const token = req.cookies.jwt;
      if (!token) {
        return res.status(401).json({
          status: "fail",
          message: "Invalid or expired token! Please log in!",
          isAuthenticated: false,
        });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      return res.status(200).json({
        status: "success",
        message: "User is authenticated",
        isAuthenticated: true,
        user: {
          id: decoded.id,
        },
      });
    } catch (err) {
      return res.status(401).json({
        status: "fail",
        isAuthenticated: false,
        message: "Invalid or expired token! Please log in!",
      });
    }
  }

  async function addPointsToUser(req, res, next) {
    try {
      const user = await Users.findByIdAndUpdate(
        req.user.id,
        { $inc: { points: req.body.points } },
        {
          new: true,
        },
      );

      if (!user) throw new Error("Cannot find and update this user.");

      res.status(200).json({
        status: "success",
        data: {
          points: user.points,
        },
      });
    } catch (err) {
      return next(new ErrorHandler(err.message, 400));
    }
  }

  return {
    createNewUser,
    logUserIn,
    logUserOut,
    protectRoute,
    checkAuthStatus,
    addPointsToUser,
  };
}
