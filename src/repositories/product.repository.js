import ProductModel from "../models/product.model.js";

const getAllProductsQuery = async (page = 1) => {
    return await ProductModel.paginate({status: true}, { page, limit: 8, lean: true });
}

const getProductByIdQuery = async (id) => {
    return await ProductModel.findById(id)
}

const createProductQuery = async ( product ) => {
    await ProductModel.create(product)
    return await getAllProductsQuery();
}

const updateProductQuery = async (id, product) => {
    await ProductModel.findByIdAndUpdate(id, product)
    return await getAllProductsQuery();
}

const deleteProductQuery = async (_id) => {
    await ProductModel.findByIdAndUpdate(_id, {status: false})
    return await getAllProductsQuery();
}

export { getAllProductsQuery, getProductByIdQuery, createProductQuery, updateProductQuery, deleteProductQuery };