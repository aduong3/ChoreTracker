import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });
import app from "./app.js";

const DB = process.env.DATABASE.replace("<username>", process.env.DATABASE_USER)
  .replace("<password>", process.env.DATABASE_PWD)
  .replace("<database>", process.env.DATABASE_NAME);

mongoose.connect(DB).then(() => console.log("DB connection successful!"));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
