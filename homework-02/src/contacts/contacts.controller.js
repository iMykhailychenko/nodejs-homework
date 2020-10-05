const Joi = require('joi');
const contacts = require('./contacts.modal');

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
const getContacts = async (_, res) => {
  try {
    res.send(await contacts.listContacts());
  } catch (err) {
    res.status(400).send({
      massage: err.message ? err.message : 'Internal error',
    });
  }
};

const getContactById = async (req, res) => {
  try {
    res.send(await contacts.getContactById(+req.params.contactId));
  } catch (err) {
    res.status(400).send({
      massage: err.message ? err.message : 'Internal error',
    });
  }
};

const postContact = async (req, res) => {
  try {
    const { error } = postSchema.validate(req.body);
    if (error) throw new Error(error.details[0].message);

    res.status(201).send(await contacts.postContact(req.body));
  } catch (err) {
    res.status(400).send({
      massage: err.message ? err.message : 'Internal error',
    });
  }
};

const datateContact = async (req, res) => {
  try {
    res.send(await contacts.deleteContact(+req.params.contactId));
  } catch (err) {
    res.status(err.message === 'Not found' ? 404 : 400).send({
      massage: err.message ? err.message : 'Internal error',
    });
  }
};

const updateContact = async (req, res) => {
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
};

module.exports = {
  getContacts,
  getContactById,
  postContact,
  datateContact,
  updateContact,
};
