import fsp from 'fs/promises';
import { Product } from "../class/product.class.js";
import { products } from "../database/db.memory.js";
import config from '../config.js';

const getAllProductsQuery = async () => {
    const allProducts = await readFile();
    return allProducts;
}

const getProductByIdQuery = async (id) => {
    return products.find(product => product.id == id);
}

const createProductQuery = async ( name, description, code, price, stock, category, thumbnail ) => {
    const allProducts = await readFile();
    allProducts.push({ id: getNewIdProduct(allProducts), name, description, code, price, available: true, stock, category, thumbnail });
    await writeFile(allProducts);
    return allProducts.filter(product => product.available);
}

const updateProductQuery = async (id, product) => {
    const index = products.findIndex(product => product.id == id);
    products[index] = product;
    return 'Producto actualizado';
}

const deleteProductQuery = async (id) => {
    const allProducts = await readFile();
    const newProducts = allProducts.map(product => {
        if(product.id == id) product.available = false;
        return product;
    });
    await writeFile(newProducts);
    return allProducts.filter(product => product.available);
}

const getNewIdProduct = (allProducts) => {
    if(products.length == 0) return 1;
    const maxId = Math.max(...allProducts.map(product => product.id));
    return maxId + 1;
}


const readFile = async () => {
    const data = await fsp.readFile(`${config.DIRNAME}/database/products.json`, 'utf-8');
    return JSON.parse(data);
}

const writeFile = async (data) => {
    await fsp.writeFile(`${config.DIRNAME}/database/products.json`, JSON.stringify(data, null, 2));
}


export { getAllProductsQuery, getProductByIdQuery, createProductQuery, updateProductQuery, deleteProductQuery };