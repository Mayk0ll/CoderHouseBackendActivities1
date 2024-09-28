export class Product {

    constructor(id, title, description, code, price, stock, category, thumbnail) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.code = code;
        this.price = price;
        this.status = stock ? true : false;
        this.stock = stock;
        this.category = category;
        this.thumbnail = thumbnail;
    }

}