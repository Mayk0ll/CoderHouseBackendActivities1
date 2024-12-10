import mongoose from "mongoose";
import CartModel from "../models/cart.model.js";

const getCartByIdQuery = async (cid) => {

}

const createCartQuery = async (uid) => {
    return await CartModel.create({
        products: [],
        user: uid
    });
}

const addProductToCartQuery = async (cart, pid) => {
    const productId = new mongoose.Types.ObjectId(pid); 
    const existingProduct = cart.products.find(product => product.product.equals(productId));

    if (existingProduct) existingProduct.quantity += 1;
    else cart.products.push({ product: productId, quantity: 1 });

    return await cart.save();
};

const getCartByUserIdQuery = async (id) => {
    return await CartModel.findOne({ user: id });
};

export { getCartByIdQuery, createCartQuery, addProductToCartQuery, getCartByUserIdQuery };
