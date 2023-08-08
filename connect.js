const config = require('./config');
const mongoose = require ('mongoose');

// eslint-disable-next-line no-unused-vars
const { dbUrl } = config;

async function connect() {
  // TODO: Conexión a la Base de Datos
  try{
    console.log('conectando bd')
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('db conectada');
  }
  catch (err) {
    console.log('falló la conexión' + err);
  };
}

module.exports = { connect };