import express from "express";
import morgan from "morgan";

import cartRoutes from "./routes/cart.routes.js";
import productRoutes from "./routes/product.routes.js";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use('/api/carts', cartRoutes);
app.use('/api/products', productRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});