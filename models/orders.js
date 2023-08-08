const mongoose = require('mongoose');
const {Schema} = mongoose;

const orderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  client: {
    type: String,
    default: "",
  },
  products: [{
    _id: false,
    qty: { 
      type: Number,
      default: 1,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'product',
      required: true,
      }
  }],
  status: {
    type: String,
    enum: ["pending", "canceled", "delivering", "delivered"],
    default: "pending",
  },
  //fecha de creación
  dateEntry: {
    type: Date,
    default: Date.now,
  }, 
  // fecha de cambio de status a delivered
  dateProcessed: {
    type: String,
    default: "",
   } 
})

const Order = mongoose.model("order", orderSchema)
module.exports = Order