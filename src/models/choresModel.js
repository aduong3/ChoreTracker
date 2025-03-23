import mongoose from "mongoose";

const choresSchema = new mongoose.Schema({
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
  },
  priority: {
    type: String,
    default: "LOW",
  },
  recurring: {
    type: String,
    required: [true, "Please enter when this chore will recur"],
  },
});

const Chores = mongoose.model("Chores", choresSchema);

export default Chores;
