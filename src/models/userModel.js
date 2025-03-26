import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Anon",
  },
  email: {
    type: String,
    required: [true, "Please enter your email. You will sign in with this."],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
    },
    message: "Passwords are not the same.",
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  passwordChangedAt: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 16);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.checkPassword = async (password, encryptedPassword) =>
  await bcrypt.compare(password, encryptedPassword);

userSchema.methods.changedPasswordAfter = function (JWT_Timestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );
    return JWT_Timestamp < changedTimestamp;
  }

  return false;
};

const Users = mongoose.model("Users", userSchema);

export default Users;
