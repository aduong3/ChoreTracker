import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });
import app from "./app.js";

const databaseUrl =
  process.env.NODE_ENV === "production"
    ? process.env.MONGO_URI
    : process.env.DATABASE;
const databaseUser =
  process.env.NODE_ENV === "production"
    ? process.env.DATABASE_PROD_USER
    : process.env.DATABASE_USER;
const databasePwd =
  process.env.NODE_ENV === "production"
    ? process.env.DATABASE_PROD_PWD
    : process.env.DATABASE_PWD;
const databaseName =
  process.env.NODE_ENV === "production"
    ? process.env.DATABASE_PROD_NAME
    : process.env.DATABASE_NAME;

const DB = databaseUrl
  .replace("<username>", databaseUser)
  .replace("<password>", databasePwd)
  .replace("<database>", databaseName);

mongoose.connect(DB).then(() => console.log("DB connection successful!"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
