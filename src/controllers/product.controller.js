import { createProductQuery, deleteProductQuery, getAllProductsQuery, getProductByIdQuery, updateProductQuery } from "../repositories/product.repository.js";

const getAllProducts = async (req, res) => {
    try {
        const products = await getAllProductsQuery();
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
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
    const { title, description, code, price, stock, category, thumbnail } = req.body;
    try {
        const newProduct = await createProductQuery( title, description, code, price, stock, category, thumbnail );
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error });
    }
}

const updateProduct = async (req, res) => {
    const pid = Number(req.params.pid);
    const { title, description, code, price, status, stock, category, thumbnail } = req.body;
    try {
        const updatedProduct = await updateProductQuery(pid, { id: pid, title, description, code, price, status, stock, category, thumbnail });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error });
    }
}

const deleteProduct = async (req, res) => {
    const pid = Number(req.params.pid);
    try {
        const deletedProduct = await deleteProductQuery(pid);
        res.status(200).json(deletedProduct);
    } catch (error) {
        res.status(500).json({ error });
    }
}
    



export { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };