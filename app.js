import express from "express";
import choresRouter from "./src/router/choresRouter.js";
import usersRouter from "./src/router/usersRouter.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// app.use(cors());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// app.options("*", cors());

app.use(express.json());
app.use(cookieParser());

// SET ROUTES HERE
app.use("/api/v1/chores", choresRouter);
app.use("/api/v1/users", usersRouter);

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: "URL not found!",
  });
});

export default app;
