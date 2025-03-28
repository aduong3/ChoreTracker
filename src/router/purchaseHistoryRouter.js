import express from "express";
import purchaseHistoryController from "../controller/purchaseHistoryController.js";
import usersController from "../controller/usersController.js";
const userController = usersController();

const router = express.Router();

const controller = purchaseHistoryController();

router.use(userController.protectRoute);

router.route("/").get(controller.getAllHistory).post(controller.addToHistory);

export default router;
