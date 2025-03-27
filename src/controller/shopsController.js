import Shops from "../models/shopsModel.js";

export default function shopsController() {
  async function getAllShopItems(req, res) {
    try {
      const shops = await Shops.find({ user: req.user._id });

      res.status(200).json({
        status: "success",
        results: shops.length,
        data: {
          shops,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  }

  async function createShopItem(req, res) {
    try {
      const shops = await Shops.create({ ...req.body, user: req.user._id });
      res.status(201).json({
        status: "success",
        data: {
          shops,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  }

  return { getAllShopItems, createShopItem };
}
