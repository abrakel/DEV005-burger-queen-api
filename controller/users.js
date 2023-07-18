const bcrypt = require('bcrypt');
const User = require('../models/users.js');
const mongoose = require('mongoose');
const { isAdmin } = require('../middleware/auth.js');

module.exports = {
  getUsers: async (req, resp ) => {
    // TODO: Implementa la función necesaria para traer la colección `users`
    const page = req.body.page || 1;
    const limit = req.body.limit || 10;
    let usersList = await User.find({})
    .select('-password -__v')
    .skip((page - 1) * limit)
    .limit(limit);
    if(req.user.role === "admin"){
    resp.json(usersList);
    }
  },

  getOneUser: async (req, resp, next) => {
  const {uid} = req.params;
  let filter;
  const isObjectId = /^[0-9a-fA-F]{24}$/.test(uid);
  if (isObjectId) {
    filter = { _id: uid}
  } else {
    filter = {email: uid.toLowerCase()}
  }
  try {
    const userExist = await User.findOne(filter).exec();
     if (!userExist) {
      return next(404);
    } else if (req.user.role === 'admin' || req.user.email === userExist.email) {
      return resp.json({_id: userExist._id, email: userExist.email, role: userExist.role});
    } return next (403)
  } catch (err) {
    console.log(err);
  }
  },

  createUser: async (req) => {
    const newUser = await User.create({
      email: req.email,
      password: bcrypt.hashSync(req.password,10),
      role: req.role
    });
    await newUser.save()
      return newUser;
  },

  updateUser: async (req, resp, next) => {
    const {email, password, role} = req.body
    const {uid} = req.params;
    let filter;
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(uid);
    if (isObjectId) {
      filter = { _id: uid};
    } else {
      filter = {email: uid.toLowerCase()};
    }
    console.log(req.user)
    try{
      const userExist = await User.findOne(filter).exec();
      if (!userExist){
        return next(404);
      } if (req.user.role !== 'admin' && (role && role !== userExist.role)){
        console.log('user no es admin y el rol existe y es diferente')
        return next(403);
      } if ( req.user.role !== 'admin' && req.user.email !== userExist.email) {
        console.log('la auth de usuario es diferente a quien quieore actualizar')
        return next(403);
      } if(req.user.role === 'admin' || req.user.email === userExist.email) {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const updateUser = await User.findOneAndUpdate(filter, {email, password: hashedPassword, role}, {new: true, select: '_id email role'});
        return resp.json(updateUser);
      }
    } catch (err) {
      console.log(err);
    }
  }
}
