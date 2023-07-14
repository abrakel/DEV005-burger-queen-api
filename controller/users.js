const bcrypt = require('bcrypt')
const User = require('../models/users.js');

module.exports = {
  getUsers: async (req, resp ) => {
    // TODO: Implementa la función necesaria para traer la colección `users`
    const page = req.body.page || 1;
    const limit = req.body.limit || 10;
    usersList = await User.find({})
    .select('-password -__v')
    .skip((page - 1) * limit)
    .limit(limit);
    resp.json(usersList);
  },

  getUsersByIdOrEmail: async (req, resp, next) => {
      if(req.body.id){
        const userById = await User.findById(req.body.id).select('-password -__v');
        resp.json(userById)
      } else if(req.body.email){
        const userByEmail = await User.findOne({email: req.body.email}).select('-password -__v');
        resp.json(userByEmail)
    } else {
      next(404)
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

  updateUser: async (userId, updateFiles) => {
    const {email, password, role} = updateFiles
    const userExist = await User.findById(userId)
    if (!userExist){
      throw new Error('no existe usuario');
    } else if (!["admin", "waiter", "chef"].includes(role)){
      throw new Error('rol incorrecto');
    } const update = await User.findByIdAndUpdate(userId, {email, password, role}, {new: true})
    return update;
  }
}
