import { Product } from "../class/product.class.js";

const carts = [];

const products = [
    new Product(1, 'Pantalla 1', 'Description Pantalla 1', 'P1', 1000, true, 10, 'Pantallas', ['']),
    new Product(2, 'Teclado 1', 'Description Teclado 1', 'T1', 500, true, 10, 'Teclados', ['']),
    new Product(3, 'Mouse 1', 'Description Mouse 1', 'M1', 300, true, 10, 'Mouses', ['']),
    new Product(4, 'Auriculares 1', 'Description Auriculares 1', 'A1', 200, true, 10, 'Auriculares', ['']),
    new Product(5, 'Monitor 1', 'Description Monitor 1', 'M1', 1500, true, 10, 'Monitores', ['']),
    new Product(6, 'Parlantes 1', 'Description Parlantes 1', 'P1', 800, true, 10, 'Parlantes', ['']),
    new Product(7, 'Webcam 1', 'Description Webcam 1', 'W1', 700, true, 10, 'Webcams', ['']),
    new Product(9, 'Impresora 1', 'Description Impresora 1', 'I1', 1200, true, 10, 'Impresoras', [''])
];


export { carts, products };