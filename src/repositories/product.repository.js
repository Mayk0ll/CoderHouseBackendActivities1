import ProductModel from "../models/product.model.js";

const getAllProductsQuery = async () => {
    return await ProductModel.find({status: true}).lean();
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