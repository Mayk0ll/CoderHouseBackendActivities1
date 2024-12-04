import { Router } from "express";
import { getAllProductsQuery } from "../repositories/product.repository.js";
import { getCartByUserIdQuery } from "../repositories/cart.repository.js";

const router = Router();

const props = {
    title: "Michael",
    port: process.env.PORT
}

router.get('/home', async (req, res) => {
    const products = await getAllProductsQuery();
    res.render('home', { ...props, products });
});

router.get('/realtimeproducts', async (req, res) => {
    const products = await getAllProductsQuery();
    res.render('realtimeproducts', { ...props, products: products });
});

router.get('/login', async (req, res) => {
    res.render('login', { ...props });
});

router.get('/register', async (req, res) => {
    res.render('register', { ...props });
});

router.get('/cart', async (req, res) => {
    const cart = await getCartByUserIdQuery();
    res.render('cart', { ...props, cart });
});

export default router;