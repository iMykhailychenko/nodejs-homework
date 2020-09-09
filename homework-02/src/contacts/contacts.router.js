const express = require('express');
const Joi = require('joi');
const contacts = require('./contacts.controller');

const postSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email()
    .required(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
}).required();

const patchSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/),
}).required();

const router = express.Router();

router.get('/', async (_, res) => {
  try {
    res.send(await contacts.listContacts());
  } catch (err) {
    res.status(400).send({
      massage: err.message ? err.message : 'Internal error',
    });
  }
});

router.get('/:contactId', async (req, res) => {
  try {
    res.send(await contacts.getContactById(+req.params.contactId));
  } catch (err) {
    res.status(400).send({
      massage: err.message ? err.message : 'Internal error',
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const { error } = postSchema.validate(req.body);
    if (error) throw new Error(error.details[0].message);

    res.status(201).send(await contacts.addContact(req.body));
  } catch (err) {
    res.status(400).send({
      massage: err.message ? err.message : 'Internal error',
    });
  }
});

router.delete('/:contactId', async (req, res) => {
  try {
    res.send(await contacts.removeContact(+req.params.contactId));
  } catch (err) {
    res.status(err.message === 'Not found' ? 404 : 400).send({
      massage: err.message ? err.message : 'Internal error',
    });
  }
});

router.patch('/:contactId', async (req, res) => {
  try {
    if (!Object.keys(req.body).length) throw new Error('missing fields');

    const { error } = patchSchema.validate(req.body);
    if (error) throw new Error(error.details[0].message);

    res.send(await contacts.updateContact(+req.params.contactId, req.body));
  } catch (err) {
    res.status(err.message === 'Not found' ? 404 : 400).send({
      massage: err.message ? err.message : 'Internal error',
    });
  }
});

module.exports = router;
