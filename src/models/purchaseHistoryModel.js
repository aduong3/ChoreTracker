import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "Users",
      required: [true, "This history item must belong to a user."],
    },
    reward: {
      type: mongoose.Schema.ObjectId,
      ref: "Shops",
      required: [true, "This history item must be a shop item."],
    },
    title: {
      type: String,
      required: [true, "Must have a title"],
    },
    price: {
      type: Number,
      required: [true, "Must have a price"],
    },
    purchasedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    strictQuery: true,
    toJSON: true,
    toObject: true,
  },
);

const History = mongoose.model("History", historySchema);

export default History;
