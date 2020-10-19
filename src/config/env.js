import dotenv from 'dotenv';

dotenv.config();
export default {
  port: process.env.PORT,
  db: {
    url: process.env.DB_URL,
  },
  auth: {
    accesKey: process.env.ACCESS_KEY,
    salt: +process.env.SALT,
  },
};
