const mongoose = require('mongoose');
const {Schema} = mongoose;

const productsSchema = new Schema({
  id: String,
  name: String,
  price: String,
  image: String, // URL imagen
  type: String, // tipo/categogía
  dataEntry: String //Fecha de creación
}) 