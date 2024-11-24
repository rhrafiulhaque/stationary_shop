"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductZodSchema = exports.createProductZodSchema = void 0;
const zod_1 = require("zod");
const product_interface_1 = require("./product.interface");
exports.createProductZodSchema = zod_1.z.object({
    name: zod_1.z.string().trim().min(1, "Name is required"),
    brand: zod_1.z.string().trim().min(1, "Brand is required"),
    price: zod_1.z.number().min(0, "Price must be a positive number"),
    category: zod_1.z.nativeEnum(product_interface_1.Category),
    description: zod_1.z.string().min(1, "Description is required"),
    quantity: zod_1.z.number().min(0, "Quantity must be a non-negative number"),
    inStock: zod_1.z.boolean(),
});
exports.updateProductZodSchema = zod_1.z
    .object({
    name: zod_1.z.string().trim().min(1, "Name is required").optional(),
    brand: zod_1.z.string().trim().min(1, "Brand is required").optional(),
    price: zod_1.z.number().min(0, "Price must be a positive number").optional(),
    category: zod_1.z.nativeEnum(product_interface_1.Category).optional(),
    description: zod_1.z.string().optional(),
    quantity: zod_1.z
        .number()
        .min(0, "Quantity must be a non-negative number")
        .optional(),
    inStock: zod_1.z.boolean().optional(),
})
    .strict();
