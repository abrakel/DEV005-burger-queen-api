const jwt = require('jsonwebtoken');
const User = require('../models/users.js')

module.exports = (secret) => (req, resp, next) => {
  const { authorization } = req.headers;
/*   console.log(req.headers) */

  if (!authorization) {
    return next();
  }

  const [type, token] = authorization.split(' ');

  if (type.toLowerCase() !== 'bearer') {
    return next();
  }

  jwt.verify(token, secret, async (err, decodedToken) => {
    if (err) {
      return next(403);
    }

    // TODO: Verificar identidad del usuario usando `decodeToken.uid`
    req.user = await User.findById(decodedToken._id);
      if(req.user){
      console.log(req.user);
      } else {
        console.log('id no encontrado en bd')
        console.log()
      }
    return next();
  });
};

module.exports.isAuthenticated = (req) => {
  // TODO: decidir por la informacion del request si la usuaria esta autenticada
  if(req.user){
    console.log('el usuario esta autenticado ' + req.user);
    return true;
  } return false;
};

module.exports.isAdmin = (req) => {
  // TODO: decidir por la informacion del request si la usuaria es admin
  if(req.user.role === 'admin'){
    console.log('el usuario tiene rol ' + req.user.role)
    return true;
  } return false;
};

module.exports.requireAuth = (req, resp, next) => (
  (!module.exports.isAuthenticated(req))
    ? next(401)
    : next()
);

module.exports.requireAdmin = (req, resp, next) => (
  // eslint-disable-next-line no-nested-ternary
  (!module.exports.isAuthenticated(req))
    ? next(401)
    : (!module.exports.isAdmin(req))
      ? next(403)
      : next()
);
