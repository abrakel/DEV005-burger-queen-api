const users = require("../routes/users");
const User = require('../models/users.js');

module.exports = {
  getUsers: async (req, resp, next) => {
    // TODO: Implementa la función necesaria para traer la colección `users`
    try{
    const userBD = await User.find({
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    });
    resp.json(userBD);
    console.log(userBD)
    } catch (err) {
      next();
    }
  },
};
