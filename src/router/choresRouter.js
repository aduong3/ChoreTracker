import express from "express";
import choresController from "../controller/choresController.js";

const router = express.Router();

const controller = choresController();

router.route("/").get(controller.getAllChores).post(controller.createChore);

router.route("/:id").delete(controller.deleteChore);

export default router;
