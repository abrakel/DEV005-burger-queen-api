const dotenv = require('dotenv');
dotenv.config();

const port = process.argv[2] || process.env.PORT;
const dbUrl = process.env.DB_URL; 
const secret = process.env.JWT_SECRET;
const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

module.exports = {
    port,
    dbUrl,
    secret,
    adminEmail,
    adminPassword
};
