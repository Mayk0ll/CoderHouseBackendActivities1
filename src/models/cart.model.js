import { Schema, model } from 'mongoose';

const cartModel = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Products',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        _id: false
    }],
});

cartModel.methods.toJSON = function() {
    const { _id, ...cart } = this.toObject();
    cart.id = _id;

    if (cart.products && Array.isArray(cart.products)) {
        cart.products = cart.products.map(product => {
            const { _id, ...rest } = product;
            return rest;
        });
    }

    return cart;
};

cartModel.pre('findOne', function() {
    this.populate('user');
    this.populate('products.product');
});

const CartModel = model('Cart', cartModel);

export default CartModel;
