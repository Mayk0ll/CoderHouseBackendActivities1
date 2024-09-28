import { addProductToCartQuery, createCartQuery, getCartByIdQuery } from "../repositories/cart.repository.js";

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
        const { cid, pid } = req.params;
        const cart = await addProductToCartQuery(Number(cid), Number(pid));
        res.json({ cart });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}

export { createCart, getCartById, addProductToCart };
