import express from "express";
import choresRouter from "./src/router/choresRouter.js";

const app = express();

app.use(express.json());

// SET ROUTES HERE
app.use("/api/v1/chores", choresRouter);

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: "URL not found!",
  });
});

export default app;
