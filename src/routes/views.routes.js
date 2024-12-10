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

router.get('/cart/:uid', async (req, res) => {
    const cart = await getCartByUserIdQuery(req.params.uid);
    const products = cart.products.map( product => {
        return {
            name: product.product.name,
            price: product.product.price,
            quantity: product.quantity,
            subtotal: product.product.price * product.quantity
        }
    });

    const total = products.reduce((acc, product) => acc + product.subtotal, 0);
    res.render('cart', { ...props, products, total });
});

export default router;