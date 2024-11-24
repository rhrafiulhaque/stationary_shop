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
exports.OrderServices = void 0;
const product_model_1 = require("../products/product.model");
const order_model_1 = require("./order.model");
const createOrderInDB = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.Product.findById(order.product);
    if (!product) {
        throw new Error("Product Not Found");
    }
    if (product.quantity < order.quantity) {
        throw new Error("Insufficent Stock for fullfill the Order");
    }
    const newQuantity = product.quantity - order.quantity;
    yield product_model_1.Product.findByIdAndUpdate(order.product, {
        $inc: { quantity: -order.quantity },
        inStock: newQuantity === 0 ? false : true,
    }, { new: true });
    const result = yield order_model_1.Order.create(order);
    return result;
});
const calculateTotalRevenue = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.aggregate([
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
});
exports.OrderServices = {
    createOrderInDB,
    calculateTotalRevenue,
};
