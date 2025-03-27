import express from "express";
import choresController from "../controller/choresController.js";
import usersController from "../controller/usersController.js";

const router = express.Router();

const controller = choresController();
const userController = usersController();

router.use(userController.protectRoute);

router.route("/").get(controller.getAllChores).post(controller.createChore);

router.route("/:id").delete(controller.deleteChore).patch(controller.editChore);
router.route("/:id/completed").patch(controller.completeChore);

export default router;
