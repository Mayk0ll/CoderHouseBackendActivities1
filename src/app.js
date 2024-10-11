import express from "express";
import morgan from "morgan";
import handlebars from "express-handlebars";
import { Server } from 'socket.io';

import cartRoutes from "./routes/cart.routes.js";
import productRoutes from "./routes/product.routes.js";
import viewsRouter from "./routes/views.routes.js";
import config from "./config.js";
import socketHandler from "./socket.js";

const app = express();
const port = config.PORT || 8080;
const httpServer = app.listen(port, () => console.log(`Server is running on port ${port}`));
const socketServer = new Server(httpServer);

socketHandler(socketServer);

app.set('socketServer', socketServer);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("src/public"));
app.use(morgan("dev"));

app.engine('handlebars', handlebars.engine());
app.set('views', `${config.DIRNAME}/views`);
app.set('view engine', 'handlebars');

app.use('/api/carts', cartRoutes);
app.use('/api/products', productRoutes);
app.use('/views', viewsRouter);

app.get('**', (req, res) => {
    res.redirect('/views/home');
});

