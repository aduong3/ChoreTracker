import express from "express";
import usersController from "../controller/usersController.js";

const router = express.Router();

const controller = usersController();

router.route("/auth-status").get(controller.checkAuthStatus);

router.route("/signup").post(controller.createNewUser);
router.route("/login").post(controller.logUserIn);

export default router;
