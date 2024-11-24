import { Request, Response } from "express";
import { OrderServices } from "./order.service";

const createOrder = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.createOrderInDB(req.body);
    res.status(200).json({
      message: "Order created successfully",
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message || "Error creating Order",
      success: false,
      error,
      stack: error.stack,
    });
  }
};

const getTotalRevenue = async (req: Request, res: Response) => {
  try {
    const totalRevenue = await OrderServices.calculateTotalRevenue();
    res.status(200).json({
      message: "Revenue calculated successfully",
      status: true,
      data: { totalRevenue },
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Failed to calculate revenue",
      status: false,
      error: error,
      stack: error.stack,
    });
  }
};
export const OrderControllers = {
  createOrder,
  getTotalRevenue,
};
