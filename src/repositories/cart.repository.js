import { Cart } from "../class/cart.class.js";
import { carts } from "../config/db.memory.js";

const getCartByIdQuery = async (id) => {
    return carts.find(cart => cart.id == id);
}

const createCartQuery = async () => {
    const newCart = new Cart(getNewIdCart(), []);
    return newCart;
}

const addProductToCartQuery = async (cid, pid) => {
    let cart = carts.find(cart => cart.id == cid);
    if(!cart) {
        cart = new Cart(cid, [{id:pid, quantity:1}]);
        carts.push(cart);
    } else {
        const product = cart.products.find(product => product.id == pid);
        if(!product) cart.products.push({id:pid, quantity:1});
        else product.quantity++;
    }
    return cart;
}

const getNewIdCart = () => {
    if(carts.length == 0) return 1;
    const maxId = Math.max(...carts.map(cart => cart.id));
    return maxId + 1;
}

export { getCartByIdQuery, createCartQuery, addProductToCartQuery };
