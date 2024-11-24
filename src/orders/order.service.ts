import { Product } from "../products/product.model";
import { IOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrderInDB = async (order: IOrder) => {
  const product = await Product.findById(order.product);
  if (!product) {
    throw new Error("Product Not Found");
  }

  if (product.quantity < order.quantity) {
    throw new Error("Insufficent Stock for fullfill the Order");
  }

  const newQuantity = product.quantity - order.quantity;
  await Product.findByIdAndUpdate(
    order.product,
    {
      $inc: { quantity: -order.quantity },
      inStock: newQuantity === 0 ? false : true,
    },
    { new: true }
  );
  const result = await Order.create(order);

  return result;
};

const calculateTotalRevenue = async () => {
  const result = await Order.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "product",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    {
      $unwind: "$productDetails",
    },
    {
      $project: {
        _id: 0,
        totalOrderRevenue: {
          $multiply: ["$quantity", "$productDetails.price"],
        },
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$totalOrderRevenue" },
      },
    },
    {
      $project: {
        _id: 0,
        totalRevenue: 1,
      },
    },
  ]);

  return result.length ? result[0].totalRevenue : 0;
};

export const OrderServices = {
  createOrderInDB,
  calculateTotalRevenue,
};
