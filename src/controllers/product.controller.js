import { createProductQuery, deleteProductQuery, getAllProductsQuery, getProductByIdQuery, updateProductQuery } from "../repositories/product.repository.js";



const getAllProducts = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({ error });
    }
}

const getProductById = async (req, res) => {
    const pid = parseInt(req.params.pid);
    try {
        
    } catch (error) {
        res.status(500).json({ error });
    }
}

const createProduct = async (req, res) => {
    const { name, description, code, price, stock, category, thumbnail = [''] } = req.body;
    try {

    } catch (error) {
        res.status(500).json({ error });
    }
}

const updateProduct = async (req, res) => {
    const pid = Number(req.params.pid);
    const { title, description, code, price, status, stock, category, thumbnail } = req.body;
    try {

    } catch (error) {
        res.status(500).json({ error });
    }
}

const deleteProduct = async (req, res) => {
    const pid = Number(req.params.pid);
    try {
        
    } catch (error) {
        res.status(500).json({ error });
    }
}
    



export { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };