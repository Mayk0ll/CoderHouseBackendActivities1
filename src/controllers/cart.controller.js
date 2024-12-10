import { addProductToCartQuery, createCartQuery, getCartByIdQuery, getCartByUserIdQuery } from "../repositories/cart.repository.js";

const getCartById = async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await getCartByIdQuery(cid);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error });
    }
}

const createCart = async (req, res) => {
    try {
        const message = await createCartQuery();
        res.json({ message });
    } catch (error) {
        res.status(500).json({ error });
    }
}

const addProductToCart = async (req, res) => {
    try {
        const { uid, pid } = req.params;
        let cart = await getCartByUserIdQuery(uid);
        if(!cart) cart = await createCartQuery(uid);
        await addProductToCartQuery(cart, pid);
        res.json({ data: 'entre' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}

export { createCart, getCartById, addProductToCart };
