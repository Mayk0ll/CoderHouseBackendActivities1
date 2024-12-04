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
        }
    }],
});

cartModel.methods.toJSON = function() {
    const { _id, ...cart } = this.toObject();
    cart.id = _id;
    return cart;
}

cartModel.pre('findOne', function(){
    this.populate('user');
    this.populate('products.product._id');
})

const CartModel = model('Cart', cartModel);

export default CartModel;