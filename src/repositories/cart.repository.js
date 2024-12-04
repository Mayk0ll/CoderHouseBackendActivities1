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
    cart.products.length === 0 ? cart.products.push({ product: pid, quantity: 1 }) : cart.products.forEach(product => {
        console.log("AAAAAAAAAAAAAAAAAAAAAAA",product.product === pid);
        if(product.product === pid) {
            console.log(product);
            product.quantity += 1;
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }
    });

    return await cart.save();
}

const getCartByUserIdQuery = async (id) => {
    return await CartModel.findOne({ user: mongoose.Types.ObjectId(id) });
};

export { getCartByIdQuery, createCartQuery, addProductToCartQuery, getCartByUserIdQuery };
