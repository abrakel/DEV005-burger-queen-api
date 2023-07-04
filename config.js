const dotenv = require('dotenv');
dotenv.config();
exports.port = process.argv[2] || process.env.PORT;
exports.dbUrl = process.env.MONGO_URL || process.env.DB_URL;
exports.secret = process.env.JWT_SECRET || 'esta-es-la-api-burger-queen';
exports.adminEmail = process.env.ADMIN_EMAIL || 'admin@localhost';
exports.adminPassword = process.env.ADMIN_PASSWORD || 'changeme';
