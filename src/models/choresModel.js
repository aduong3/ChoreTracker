import mongoose from "mongoose";

const choresSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please insert a title for your chore!"],
      maxlength: [30, "Max amount of characters for the title is 30."],
    },
    description: {
      type: String,
      maxlength: [100, "Max amount of characters for the description is 100."],
    },
    dueDate: {
      type: Date,
      required: [true, "Please insert a due date for the chore!"],
      validate: {
        validator: function (val) {
          const startOfToday = new Date();
          const dueDate = new Date(val);
          startOfToday.setUTCHours(0, 0, 0, 0);
          return dueDate.getTime() >= startOfToday.getTime();
        },
        message: "Date should not be in the past.",
      },
    },
    day: {
      type: String,
    },
    points: {
      type: Number,
      required: [
        true,
        "Please insert the amount of points to earn each time this chore is completed.",
      ],
      min: [1, "Minimum amount of points is 1."],
      max: [20, "Max amount of points is 20."],
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "completed"],
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
    },
    recurring: {
      type: String,
      required: [true, "Please enter when this chore will recur"],
      enum: ["monthly", "weekly", "daily", "none"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "Users",
      required: [true, "Chore must belong to a user."],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const Chores = mongoose.model("Chores", choresSchema);

export default Chores;
