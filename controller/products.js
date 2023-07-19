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

  getProducts: async (req, resp) => {
    const page = req.body.page || 1;
    const limit = req.body.limit || 10;
    let usersList = await Product.find({})
    .select('-__v')
    .skip((page - 1) * limit)
    .limit(limit);
    return resp.json(usersList);
  },

  getOneProduct: async (req, resp, next) => {
    const {productId} = req.params;
    let filter;
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(productId);
    if (isObjectId) {
      filter = { _id: productId}
    } else {
      filter = {name: productId.toLowerCase()}
    }
    try {
      const productExist = await Product.findOne(filter).exec();
       if (!productExist) {
        return next(404);
      } 
        return resp.json({_id: productExist._id, name: productExist.name,
          price: productExist.price, image: productExist.image, type: productExist.type,
          dataEntry: productExist.dataEntry}); 
    } catch (err) {
      console.log(err);
    }
  },

  updateProduct: async (req, resp, next) => {

  },

  deleteProduct: async (req, resp, next) => {

  }
}