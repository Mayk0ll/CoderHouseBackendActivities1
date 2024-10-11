import { Router } from "express";
import { getAllProductsQuery } from "../repositories/product.repository.js";

const router = Router();

router.get('/', (req, res) => {
    
    res.render('index');
});

router.get('/home', async (req, res) => {
    const products = await getAllProductsQuery();
    res.render('home', { products });
});

router.get('/realtimeproducts', async (req, res) => {
    const products = await getAllProductsQuery();
    res.render('realtimeproducts', { products });
});




export default router;