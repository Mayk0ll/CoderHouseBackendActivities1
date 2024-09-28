import { Product } from "../class/product.class.js";
import { products } from "../config/db.memory.js"

const getAllProductsQuery = async () => {
    const allProducts = products.filter(product => product.status);
    return allProducts;
}

const getProductByIdQuery = async (id) => {
    return products.find(product => product.id == id);
}

const createProductQuery = async ( title, description, code, price, stock, category, thumbnail ) => {
    const newProduct = new Product(getNewIdProduct(), title, description, code, price, stock, category, thumbnail);
    products.push(newProduct);
    return 'Producto creado';
}

const updateProductQuery = async (id, product) => {
    const index = products.findIndex(product => product.id == id);
    products[index] = product;
    return 'Producto actualizado';
}

const deleteProductQuery = async (id) => {
    const index = products.findIndex(product => product.id == id);
    products[index].status = false;
    return 'Producto eliminado';
}

const getNewIdProduct = () => {
    if(products.length == 0) return 1;
    const maxId = Math.max(...products.map(product => product.id));
    return maxId + 1;
}

export { getAllProductsQuery, getProductByIdQuery, createProductQuery, updateProductQuery, deleteProductQuery };