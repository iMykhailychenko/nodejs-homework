const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const connection = require('./db/connection');
const env = require('./config/env');
const contacts = require('./contacts/contacts.router');

async function main() {
  await connection.connect();

  const app = express();
  const PORT = env.port || 3000;

  morgan('tiny');
  app.use(cors());
  app.use(express.urlencoded());
  app.use(express.json());

  app.use('/api/contacts', contacts);
  app.listen(PORT, () => console.log('Run on port:', PORT));

  process.on('SIGILL', () => {
    connection.close();
  });
}

main().catch(console.error);
