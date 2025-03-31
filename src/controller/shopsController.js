import Shops from "../models/shopsModel.js";

export default function shopsController() {
  async function getAllShopItems(req, res) {
    try {
      const shops = await Shops.find({ user: req.user._id }).sort({ price: 1 });

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

  async function deleteShopItem(req, res) {
    try {
      await Shops.findByIdAndDelete(req.params.id);

      res.status(204).json({
        status: "success",
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  }

  async function editShopItem(req, res) {
    try {
      const shop = await Shops.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      res.status(200).json({
        status: "success",
        data: {
          shop,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  }

  return { getAllShopItems, createShopItem, deleteShopItem, editShopItem };
}
