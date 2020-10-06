const express = require('express');
const contacts = require('./contacts.controller');

const router = express.Router();

router.get('/', contacts.getContacts);

router.get('/:contactId', contacts.getContactById);

router.post('/', contacts.postContact);

router.delete('/:contactId', contacts.datateContact);

router.patch('/:contactId', contacts.updateContact);

module.exports = router;
