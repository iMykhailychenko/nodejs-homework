const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const config = require('./config');
const contacts = require('./contacts/contacts.router');

const app = express();
const PORT = config.port || 3000;

morgan('tiny');
app.use(cors());

app.use(express.urlencoded());
app.use(express.json());

app.use('/api/contacts', contacts);

app.listen(PORT, () => console.log('Run on port:', PORT));
