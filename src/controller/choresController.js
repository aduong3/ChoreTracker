import Chores from "./../models/choresModel.js";

export default function choresController() {
  async function getAllChores(req, res) {
    try {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      const chores = await Chores.find({
        user: req.user._id,
        $or: [
          { status: "pending", dueDate: { $gte: startOfDay } },
          { status: "completed", completedAt: { $lte: endOfDay } },
        ],
      }).sort({ status: -1, dueDate: 1 });

      res.status(200).json({
        status: "success",
        results: chores.length,
        data: {
          chores,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  }

  async function createChore(req, res) {
    try {
      const chore = await Chores.create({ ...req.body, user: req.user._id });

      res.status(201).json({
        status: "success",
        data: {
          chore,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  }

  async function deleteChore(req, res) {
    try {
      const chore = await Chores.findByIdAndDelete(req.params.id);
      if (!chore) {
        throw new Error("Unable to find and delete chore.");
      }

      res.status(204).json({
        status: "success",
        data: {
          chore,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  }

  async function editChore(req, res) {
    try {
      const chore = await Chores.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!chore) {
        throw new Error("Unable to find and delete chore.");
      }

      res.status(200).json({
        status: "success",
        data: {
          chore,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  }

  async function completeChore(req, res) {
    try {
      const chore = await Chores.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: false,
      });
      if (!chore)
        throw new Error("This chore does not exist and cannot be completed");
      res.status(200).json({
        status: "success",
        data: {
          chore,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  }

  return { getAllChores, createChore, deleteChore, editChore, completeChore };
}
