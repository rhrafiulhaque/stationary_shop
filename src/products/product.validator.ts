import { z } from "zod";
import { Category } from "./product.interface";

export const createProductZodSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  brand: z.string().trim().min(1, "Brand is required"),
  price: z.number().min(0, "Price must be a positive number"),
  category: z.nativeEnum(Category),
  description: z.string().min(1, "Description is required"),
  quantity: z.number().min(0, "Quantity must be a non-negative number"),
  inStock: z.boolean(),
});

export const updateProductZodSchema = z
  .object({
    name: z.string().trim().min(1, "Name is required").optional(),
    brand: z.string().trim().min(1, "Brand is required").optional(),
    price: z.number().min(0, "Price must be a positive number").optional(),
    category: z.nativeEnum(Category).optional(),
    description: z.string().optional(),
    quantity: z
      .number()
      .min(0, "Quantity must be a non-negative number")
      .optional(),
    inStock: z.boolean().optional(),
  })
  .strict();
