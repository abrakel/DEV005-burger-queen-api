const Order = require('../models/orders.js');

module.exports = {
  createOrder: async (req, resp, next) => {
    try{
      if (!req.body.userId || req.body.products.length === 0){
        return next(400);
      }
      const order = new Order(req.body)
      await order.save();
      await order
      .populate({path: 'products.product', select: '-__v'});
      const { _id, userId, client, products, status, dateProcessed, dateEntry } = order;
      const response = {
        _id,
        userId,
        client,
        products,
        status,
        dateEntry,
        dateProcessed,
      };
      return resp.json(response);
    } catch (err) {
      console.log('order not created');
    }
  },

  getOrders: async (req, resp) => {
    const page = req.body.page || 1;
    const limit = req.body.limit || 10;
    let orderList = await Order.find({})
    .select('-__v -products._id')
    .populate({ path: 'products.product', select: '-__v'})
    .skip((page - 1) * limit)
    .limit(limit);
    return resp.json(orderList);
  },

  getOneOrder: async (req, resp, next) => {
    const {orderId} = req.params;
    try {
      const orderExist = await Order.findById(orderId)
      .populate({ path: 'products.product', select: '-__v -_id'})
      .select('-__v')
      .exec();
       if (!orderExist) {
        return next(404);
      } 
      return resp.json(orderExist); 
    } catch (err) {
      console.log(err);
      return next(400);
    }
  },

  updateOrder: async (req, resp, next) => {
    const {status} = req.body;
    const  {orderId} = req.params;
    try{
      if (!status){
        return next(400);
      } 
      const orderExist = await Order.findById(orderId).exec();
      if(!orderExist){
        return next(404)
      }
      const updateOrderStatus = await Order.findByIdAndUpdate(orderId, {status, dateProcessed: new Date().toLocaleString()}, {new: true, select: '-__v'});
      await updateOrderStatus.populate({path: 'products.product', select: '-__v'});
      return resp.json(updateOrderStatus);
      } catch (err) {
        console.log(err);
        return next(400);
    }
  },

  deleteOrder: async (req, resp, next) => {
    const {orderId} = req.params;
    try{
      const orderExist = await Order.findById(orderId).exec();
      if (!orderExist){
        return next(404);
      } if (req.user.role !== 'admin'){
        next(403);
      } else {
        const deleteOrder = await Order.findByIdAndDelete(orderId, {select: '-__v'});
        await deleteOrder.populate({path: 'products.product', select: '-__v'});
        return resp.json(deleteOrder);
      }
    } catch (err) {
      console.log(err);
      return next(400);
    }
  }
}