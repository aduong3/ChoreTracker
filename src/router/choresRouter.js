import express from "express";
import choresController from "../controller/choresController.js";
import usersController from "../controller/usersController.js";

const router = express.Router();

const controller = choresController();
const userController = usersController();

router
  .route("/")
  .get(controller.getAllChores)
  .post(userController.protectRoute, controller.createChore);

router.route("/:id").delete(controller.deleteChore).patch(controller.editChore);

export default router;
