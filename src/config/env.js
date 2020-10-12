require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  db: {
    url: process.env.DB_URL,
    name: process.env.DB_NAME,
  },
};
