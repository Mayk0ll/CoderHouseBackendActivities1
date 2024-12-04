import { Schema, model } from 'mongoose';
import mongoosePag from 'mongoose-paginate-v2';

const productModel = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    code: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    stock: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        required: true,
        index: true,
    },
    thumbnail: {
        type: Array,
        default: ['']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

productModel.plugin( mongoosePag );

productModel.methods.toJSON = function() {
    const { _id, ...product } = this.toObject();
    product.id = _id;
    delete product.createdAt;
    delete product.updatedAt;
    delete product.__v;
    return product;
}

productModel.pre('find', function() {
    // this.populate('category');
    
})

const ProductModel = model('Products', productModel);

export default ProductModel;
