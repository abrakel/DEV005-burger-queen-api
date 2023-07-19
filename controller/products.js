const Product = require('../models/products.js');

module.exports = {
  createProduct: async (req, resp, next) => {
    const {name, price} = req.body;
    const user = req.user;
    const product = await Product.findOne({name: name});
    if (!name || !price){
      return next(400);
    } else if (product){
      return next(403)
    }else if (user.role !== 'admin'){
      return next(403);
    } 
    const currentDate = new Date().toLocaleString();
    const newProduct = await Product.create ({
      name: name,
      price: price,
      image: req.body.image,
      type: req.body.type,
      dataEntry: currentDate,
    });
    await newProduct.save();
    return resp.json({_id: newProduct._id, name: newProduct.name,
    price: newProduct.price, image: newProduct.image, type: newProduct.type,
    dataEntry: newProduct.dataEntry});
  },

  getProducts: async (req, resp, next) => {

  },

  getOneProduct: async (req, resp, next) => {

  },

  updateProduct: async (req, resp, next) => {

  },

  deleteProduct: async (req, resp, next) => {

  }
}