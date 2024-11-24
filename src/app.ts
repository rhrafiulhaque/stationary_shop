import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { OrderRoutes } from "./orders/order.route";
import { ProductRoutes } from "./products/product.route";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api", ProductRoutes);
app.use("/api", OrderRoutes);

export default app;
