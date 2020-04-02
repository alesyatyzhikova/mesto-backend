require('dotenv').config();

const PORT = process.env.PORT || 3000;
const DATABASE = 'mongodb://localhost:27017/mestodb';
const JWT_SECRET = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret-key';

module.exports = {
  PORT,
  DATABASE,
  JWT_SECRET,
};
