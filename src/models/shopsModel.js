import mongoose from "mongoose";

const shopsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "This item needs a title"],
    },
    price: {
      type: Number,
      required: [true, "Item needs a price"],
      min: [200, "Minimum price is 200 points"],
    },
    icon: {
      type: String,
      required: [true, "Please choose an icon"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "Users",
      required: [true, "Chore must belong to a user."],
    },
  },
  {
    strictQuery: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const Shops = mongoose.model("Shops", shopsSchema);

export default Shops;
