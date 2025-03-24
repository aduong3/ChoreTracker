import Chores from "./../models/choresModel.js";

export default function choresController() {
  async function getAllChores(req, res) {
    try {
      const chores = await Chores.find();

      res.status(200).json({
        status: "success",
        data: {
          chores,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: "Could not get all chores",
      });
    }
  }

  async function createChore(req, res) {
    try {
      const chore = await Chores.create(req.body);

      res.status(201).json({
        status: "success",
        data: {
          chore,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: "Failed to create chore",
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

  return { getAllChores, createChore, deleteChore };
}
