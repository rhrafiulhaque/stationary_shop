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
exports.ProductService = void 0;
const product_model_1 = require("./product.model");
const createProductInDB = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const hasProduct = yield product_model_1.Product.findOne({ name: product.name });
    if (hasProduct) {
        throw new Error("The Product already added");
    }
    else {
        const result = yield product_model_1.Product.create(product);
        return result;
    }
});
const getAllProductFromDB = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.find(searchTerm
        ? {
            $or: [
                { name: { $regex: searchTerm, $options: "i" } },
                { brand: { $regex: searchTerm, $options: "i" } },
                { category: { $regex: searchTerm, $options: "i" } },
            ],
        }
        : {});
    return result;
});
const getProductByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findById(id);
    return result;
});
const updateProductByIdInDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const hasProduct = yield product_model_1.Product.findOne({ _id: id });
    if (!hasProduct) {
        throw new Error("There Have No prodcut to update in this ID");
    }
    else {
        const result = yield product_model_1.Product.findByIdAndUpdate(id, Object.assign(Object.assign({}, data), { inStock: data.quantity && data.quantity > 0 ? true : false }), { new: true });
        return result;
    }
});
const deleteProductByIdInDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndDelete(productId);
    if (!result) {
        throw new Error("Product not found by this ID");
    }
    else {
        return result;
    }
});
exports.ProductService = {
    createProductInDB,
    getAllProductFromDB,
    getProductByIdFromDB,
    updateProductByIdInDB,
    deleteProductByIdInDB,
};
