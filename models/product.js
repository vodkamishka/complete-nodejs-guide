const fs = require('fs');
const path = require('path');

const Cart = require('./cart');

const p = path.join(
  path.dirname(require.main.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(body) {
    this.id = body.id;
    this.title = body.title;
    this.imageUrl = body.imageUrl;
    this.price = body.price;
    this.description = body.description;
  }

  save() {
    getProductsFromFile(products => {
      if (this.id) {
          const existingProductIndex = products.findIndex(prod => prod.id === this.id);
          const updateProducts = [...products];
          updateProducts[existingProductIndex] = this;
          fs.writeFile(p, JSON.stringify(updateProducts), err => {
            console.log(err);
          });
      } else {
          this.id = Math.random().toString();
          products.push(this);
          fs.writeFile(p, JSON.stringify(products), err => {
            console.log(err);
          });
      }
    });
  }

  static deleteById(id) {
      getProductsFromFile(products => {
          const product = products.find(prod => prod.id === id);
          const updateProducts = products.filter(prod => prod.id !== id);
          fs.writeFile(p, JSON.stringify(updateProducts), err => {
              if (!err) {
                  Cart.deleteProduct(id, product.price);
              }
          });

      })
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product  = products.find(p => p.id === id);
      cb(product);
    })
  }
};
