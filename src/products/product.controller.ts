import { Request, Response } from "express";
import { z } from "zod";
import { ProductService } from "./product.service";
import {
  createProductZodSchema,
  updateProductZodSchema,
} from "./product.validator";

const createProduct = async (req: Request, res: Response) => {
  try {
    const createProductValidation = createProductZodSchema.parse(req.body);
    const result = await ProductService.createProductInDB(
      createProductValidation
    );
    res.status(200).json({
      message: "Product created successfully",
      success: true,
      data: result,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        message: "Validation Failed",
        success: false,
        errors: error.errors,
        stack: error.stack,
      });
    } else {
      res.status(400).json({
        message: error.message || "Product not Created Successfully",
        success: false,
        error,
        stack: error.stack,
      });
    }
  }
};

const getAllProduct = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    const result = await ProductService.getAllProductFromDB(
      searchTerm as string
    );
    if (result.length === 0) {
      res.status(200).json({
        message: "No Product In DB",
        success: false,
        data: {},
      });
    } else {
      res.status(200).json({
        message: "Products Retrive Successfully",
        success: true,
        data: result,
      });
    }
  } catch (error: any) {
    res.status(400).json({
      message: "Something problem to get the Data From DB",
      success: false,
      error: error,
      stack: error.stack,
    });
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductService.getProductByIdFromDB(productId);
    if (result) {
      res.status(200).json({
        message: "Product Retrive Successfully",
        success: true,
        data: result,
      });
    } else {
      res.status(400).json({
        message: "No Product as Like this Product ID",
        success: false,
        data: {},
      });
    }
  } catch (error: any) {
    res.status(400).json({
      message: "Something went wrong to Product Retrive",
      success: false,
      error,
      stack: error.stack,
    });
  }
};

const updateProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updatedProduct = req.body;
    const updateProductValidation =
      updateProductZodSchema.parse(updatedProduct);
    const result = await ProductService.updateProductByIdInDB(
      productId,
      updateProductValidation
    );
    res.status(200).json({
      message: "Product Updated Successfully",
      success: true,
      data: result,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        message: "Validation Failed",
        success: false,
        errors: error.errors,
        stack: error.stack,
      });
    } else {
      res.status(400).json({
        message: error.message || "Product not Updated Successfully",
        success: false,
        error,
      });
    }
  }
};

const deleteProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductService.deleteProductByIdInDB(productId);

    res.status(200).json({
      message: "Product Deleted Successfully",
      success: true,
      data: {},
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message || "Product not deleted Successfully",
      success: false,
      error,
      stack: error.stack,
    });
  }
};

export const ProductController = {
  createProduct,
  getAllProduct,
  getProductById,
  updateProductById,
  deleteProductById,
};
