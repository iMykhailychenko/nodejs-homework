const Joi = require('joi');
const contacts = require('./contacts.modal');
const { errorWrapper } = require('../config/helpers');

// validation shemas
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

// controllers
const getContacts = errorWrapper(async (_, res) => {
  res.send(await contacts.listContacts());
});

const getContactById = errorWrapper(async (req, res) => {
  res.send(await contacts.getContactById(+req.params.contactId));
});

const postContact = errorWrapper(async (req, res) => {
  const { error } = postSchema.validate(req.body);
  if (error) throw new Error(error.details[0].message);
  res.status(201).send(await contacts.postContact(req.body));
});

const datateContact = errorWrapper(async (req, res) => {
  res.send(await contacts.deleteContact(+req.params.contactId));
});

const updateContact = errorWrapper(async (req, res) => {
  if (!Object.keys(req.body).length) throw new Error('missing fields');
  const { error } = patchSchema.validate(req.body);
  if (error) throw new Error(error.details[0].message);
  res.send(await contacts.updateContact(+req.params.contactId, req.body));
});

module.exports = {
  getContacts,
  getContactById,
  postContact,
  datateContact,
  updateContact,
};
