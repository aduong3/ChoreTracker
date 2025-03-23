import Chores from "./../models/choresModel.js";

export default function choresController() {
  async function getAllChores(req, res, next) {
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

  async function createChore(req, res, next) {
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

  return { getAllChores, createChore };
}
