"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
router.post("/products", product_controller_1.ProductController.createProduct);
router.get("/products", product_controller_1.ProductController.getAllProduct);
router.get("/products/:productId", product_controller_1.ProductController.getProductById);
router.put("/products/:productId", product_controller_1.ProductController.updateProductById);
router.delete("/products/:productId", product_controller_1.ProductController.deleteProductById);
exports.ProductRoutes = router;
