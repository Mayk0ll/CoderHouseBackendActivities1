import { Router } from "express";

const router = Router();

const props = {
    title: "Michael",
    port: process.env.PORT
}

router.get('/home', async (req, res) => {
    const products = {}
    res.render('home', { ...props, products });
});

router.get('/realtimeproducts', async (req, res) => {
    const products = {}
    res.render('realtimeproducts', { ...props, products });
});




export default router;