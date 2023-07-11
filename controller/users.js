const bcrypt = require('bcrypt')
const User = require('../models/users.js');

module.exports = {
  getUsers: async (req, resp, next) => {
    // TODO: Implementa la función necesaria para traer la colección `users`
    req.user = await User.find({}).select('-password -__v');
    resp.send(req.user);
    next();
  },

  getUsersByIdOrEmail: async (req, resp, next) => {
    try {
      if(req.body.id){
        const userById = await User.findById(req.body.id).select('-password -__v');
        resp.json(userById)
      } else if(req.body.email){
        const userByEmail = await User.findOne({email: req.body.email}).select('-password -__v');
        resp.json(userByEmail)
    } else {
      next(404)
    }
  }
    catch (err) {
      next(err);
    }
  },

  createUser: (req, resp, next) => {
    User.create({
      email: req.email,
      password: bcrypt.hashSync(req.password,10),
      role: req.role
    });
  }
}
