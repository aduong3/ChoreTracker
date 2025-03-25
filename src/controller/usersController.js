import Users from "../models/userModel.js";
import ErrorHandler from "../services/ErrorHandler.js";

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

      user.password = undefined;

      res.status(201).json({
        status: "success",
        data: {
          user,
        },
      });
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
        return next(new ErrorHandler("Incorrect email or password", 400));
      }

      user.password = undefined;

      res.status(200).json({
        status: "success",
        data: {
          user,
        },
      });
    } catch (err) {
      return next(new ErrorHandler(err.message, 400));
    }
  }

  return { createNewUser, logUserIn };
}
