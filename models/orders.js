const mongoose = require('mongoose');
const {Schema} = mongoose;

const ordersSchema = new Schema({
  id: {
    type: Number,
    unique: true,
    require: true
  },
  client: String,
  products: [{
    productOrder: {
      qty: { 
        type: Number,
        require: true
      },
      product: {
        id: {
          type: String,
          unique: true
        },
        name: String,
        price: String,
        image: String,
        type: String,
        dataEntry: Date
      }
    }
  }],
  status: {
    type: String,
    enum: [pending, canceled, delivering, delivered]
  },
  dateEntry: String, //fecha de creación
  dateProcessed: String // fecha de cambio de status a delivered
})