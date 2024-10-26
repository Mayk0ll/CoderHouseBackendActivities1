import { Router } from "express";
import usersRoutes from "./users.routes.js"
import productsRoutes from "./products.routes.js"
import cartsRoutes from "./carts.routes.js"

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/products', productsRoutes);
routes.use('/carts', cartsRoutes);

export default routes;