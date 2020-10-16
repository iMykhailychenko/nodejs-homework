import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import connection from './db/connection';
import env from './config/env';
import contacts from './contacts/contacts.router';

const app = express();
const PORT = env.port || 3000;

async function main() {
  await connection.connect();

  morgan('tiny');
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use('/api/contacts', contacts);
  app.listen(PORT, () => console.log('Run on port:', PORT));

  process.on('SIGILL', () => {
    connection.close();
  });
}

main().catch(console.error);
