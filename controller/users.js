const bcrypt = require('bcrypt')
const User = require('../models/users.js');

module.exports = {
  getUsers: async (req, resp, next) => {
    // TODO: Implementa la función necesaria para traer la colección `users`
/*     const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const users = await User.find()
        .select("-password -__v")
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();

    resp.json(users); */
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
