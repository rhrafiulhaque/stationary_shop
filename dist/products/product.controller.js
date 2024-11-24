"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const zod_1 = require("zod");
const product_service_1 = require("./product.service");
const product_validator_1 = require("./product.validator");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createProductValidation = product_validator_1.createProductZodSchema.parse(req.body);
        const result = yield product_service_1.ProductService.createProductInDB(createProductValidation);
        res.status(200).json({
            message: "Product created successfully",
            success: true,
            data: result,
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({
                message: "Validation Failed",
                success: false,
                errors: error.errors,
                stack: error.stack,
            });
        }
        else {
            res.status(400).json({
                message: error.message || "Product not Created Successfully",
                success: false,
                error,
                stack: error.stack,
            });
        }
    }
});
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.query;
        const result = yield product_service_1.ProductService.getAllProductFromDB(searchTerm);
        if (result.length === 0) {
            res.status(200).json({
                message: "No Product In DB",
                success: false,
                data: {},
            });
        }
        else {
            res.status(200).json({
                message: "Products Retrive Successfully",
                success: true,
                data: result,
            });
        }
    }
    catch (error) {
        res.status(400).json({
            message: "Something problem to get the Data From DB",
            success: false,
            error: error,
            stack: error.stack,
        });
    }
});
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductService.getProductByIdFromDB(productId);
        if (result) {
            res.status(200).json({
                message: "Product Retrive Successfully",
                success: true,
                data: result,
            });
        }
        else {
            res.status(400).json({
                message: "No Product as Like this Product ID",
                success: false,
                data: {},
            });
        }
    }
    catch (error) {
        res.status(400).json({
            message: "Something went wrong to Product Retrive",
            success: false,
            error,
            stack: error.stack,
        });
    }
});
const updateProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const updatedProduct = req.body;
        const updateProductValidation = product_validator_1.updateProductZodSchema.parse(updatedProduct);
        const result = yield product_service_1.ProductService.updateProductByIdInDB(productId, updateProductValidation);
        res.status(200).json({
            message: "Product Updated Successfully",
            success: true,
            data: result,
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({
                message: "Validation Failed",
                success: false,
                errors: error.errors,
                stack: error.stack,
            });
        }
        else {
            res.status(400).json({
                message: error.message || "Product not Updated Successfully",
                success: false,
                error,
            });
        }
    }
});
const deleteProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        yield product_service_1.ProductService.deleteProductByIdInDB(productId);
        res.status(200).json({
            message: "Product Deleted Successfully",
            success: true,
            data: {},
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message || "Product not deleted Successfully",
            success: false,
            error,
            stack: error.stack,
        });
    }
});
exports.ProductController = {
    createProduct,
    getAllProduct,
    getProductById,
    updateProductById,
    deleteProductById,
};
