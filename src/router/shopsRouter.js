import express from "express";
import shopsController from "../controller/shopsController.js";
import usersController from "../controller/usersController.js";

const router = express.Router();
const controller = shopsController();
const userController = usersController();

router.use(userController.protectRoute);

router
  .route("/")
  .get(controller.getAllShopItems)
  .post(controller.createShopItem);

router.route("/:id").delete(controller.deleteShopItem);

export default router;
