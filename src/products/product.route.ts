import express from "express";
import { ProductController } from "./product.controller";

const router = express.Router();

router.post("/products", ProductController.createProduct);
router.get("/products", ProductController.getAllProduct);
router.get("/products/:productId", ProductController.getProductById);
router.put("/products/:productId", ProductController.updateProductById);
router.delete("/products/:productId", ProductController.deleteProductById);

export const ProductRoutes = router;
