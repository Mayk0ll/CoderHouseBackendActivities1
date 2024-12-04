import { createProductQuery, deleteProductQuery, getAllProductsQuery, getProductByIdQuery, updateProductQuery } from "../repositories/product.repository.js";

const getAllProducts = async (req, res) => {
    try {
        const products = await getAllProductsQuery();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error });
    }
}

const getProductById = async (req, res) => {
    const pid = parseInt(req.params.pid);
    try {
        const product = await getProductByIdQuery(pid);
        if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error });
    }
}

const createProduct = async (req, res) => {
    const { name, description, code, price, stock, category, thumbnail } = req.body;
    try {
        if (!name || !description || !code || !price || !stock || !category) return res.status(400).json({ error: 'Por favor complete todos los campos' });
        //falta imagenes
        const allProducts = await createProductQuery({ name, description, code, price, stock, category, thumbnail });
        const socketServer = req.app.get('socketServer');
        console.log(allProducts);
        socketServer.emit('server:refreshProduct', allProducts);
        res.status(201).json('Producto creado');
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}

const updateProduct = async (req, res) => {
    const pid = Number(req.params.pid);
    const { name, description, code, price, status, stock, category, thumbnail } = req.body;
    try {
        if (!name || !description || !code || !price || !stock || !category) return res.status(400).json({ error: 'Por favor complete todos los campos' });

        const allProducts = await updateProductQuery(pid, { name, description, code, price, stock, category, thumbnail });
        const socketServer = req.app.get('socketServer');
        socketServer.emit('server:refreshProduct', allProducts);
        res.status(200).json('Producto actualizado');
    } catch (error) {
        res.status(500).json({ error });
    }
}

const deleteProduct = async (req, res) => {
    const pid = req.params.pid;
    try {
        const allProducts = await deleteProductQuery(pid);
        const socketServer = req.app.get('socketServer');
        socketServer.emit('server:refreshProduct', allProducts);
        res.status(200).json('Producto eliminado');
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}
    



export { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };