const db = require('../utils/database');

const Cart = require('./cart');

module.exports = class Product {
  constructor(body) {
    this.id = body.id;
    this.title = body.title;
    this.imageUrl = body.imageUrl;
    this.price = body.price;
    this.description = body.description;
  }

  save() {
    return db.execute('INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)', 
    [this.title, this.price, this.imageUrl, this.description]
    )}

  static deleteById(id) {
      
  }

  static fetchAll() {
    return db.execute('SELECT * FROM products')
  }

  static findById(id) {
    return db.execute('SELECT * FROM products WHERE products.id = ?', [id])
  }
};
