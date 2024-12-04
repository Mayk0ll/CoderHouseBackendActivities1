import { Router } from "express";
import { addProductToCart, createCart, getCartById } from "../controllers/cart.controller.js";

const router = Router();

router.get('/:cid', [], getCartById);

router.post('/', [], createCart);

router.post('/:uid/product/:pid', [], addProductToCart);

export default router;