import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./config";

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("Database Connected");
    server = app.listen(config.port, () => {
      console.log(`Server is Running at ${config.port}`);
    });
  } catch (err) {
    console.log("Error Occuered", err);
  }
}

main();
