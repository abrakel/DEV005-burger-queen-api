const mongoose = require('mongoose');
const {Schema} = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    require: true,
    unique: true,
    lowecase: true,
    trim: true
  },
  price: {
    type: Number,
    require: true,
    default: 0
  },
  // URL imagen
  image: {
    type: String,
    default: ""
  }, 
  // tipo/categogía
  type: {
    type: String,
    default: ""
  },
   //Fecha de creación
  dataEntry: {
    type: String,
   } 
}) ;

const Product = mongoose.model("product", productSchema)
module.exports = Product