const bcrypt = require('bcrypt')
const User = require('../models/users.js');

module.exports = {
  getUsers: async (req, resp, next) => {
    // TODO: Implementa la función necesaria para traer la colección `users`
    req.user = await User.find({}).select('-password -__v');
    resp.send(req.user);
  },

  createUser: (req, resp, next) => {
    const {email, password, role} = req.body;
    console.log(req.body)
    if(!email || !password){
      return next();
    } else {
      User.create({
        email: email,
        password: bcrypt.hashSync(password,10),
        role: role
      })
        console.log('nuevo usuario creado ');
        resp.send({message: 'usuario creado exitosamente'})
    } 
  }
}
