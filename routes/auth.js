const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/users');

const { secret } = config;

/** @module auth */
module.exports = (app, nextMain) => {
  /**
   * @name /auth
   * @description Crea token de autenticación.
   * @path {POST} /auth
   * @body {String} email Correo
   * @body {String} password Contraseña
   * @response {Object} resp
   * @response {String} resp.token Token a usar para los requests sucesivos
   * @code {200} si la autenticación es correcta
   * @code {400} si no se proveen `email` o `password` o ninguno de los dos
   * @auth No requiere autenticación
   */
  app.post('/auth', (req, resp, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(400);
    }
    // TODO: autenticar a la usuarix
    // Hay que confirmar si el email y password
    // coinciden con un user en la base de datos
    // Si coinciden, manda un access token creado con jwt
    User.findOne({email: email}).then((userDB) => {
      if(userDB && userDB.password === password){
        const token = jwt.sign({
          email,
          password,
          exp: Date.now() + 60 * 1000,
        }, secret);
        resp.send({ token, email: userDB.email});
      } else {
      resp.send({message: 'not found'});
      }
    })
  });

  return nextMain();
};
