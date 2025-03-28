import History from "../models/purchaseHistoryModel.js";

export default function purchaseHistoryController() {
  async function getAllHistory(req, res) {
    try {
      const history = await History.find({ user: req.user._id });

      res.status(200).json({
        status: "success",
        results: history.length,
        data: {
          history,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  }

  async function addToHistory(req, res) {
    try {
      const item = History.create({ ...req.body, user: req.user.id });

      res.status(201).json({
        status: "success",
        data: {
          item,
        },
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }

  return { getAllHistory, addToHistory };
}
