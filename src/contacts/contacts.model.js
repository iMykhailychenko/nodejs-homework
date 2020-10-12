const mongodb = require('mongodb');
const db = require('../db/connection');

class Contacts {
  constructor({ name, email, phone, subscription, password }) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.subscription = subscription;
    this.password = password;
    this.token = '';
  }
}

const listContacts = async (limit = 50) => {
  try {
    return await db
      .collection('contacts')
      .find({})
      .limit(limit)
      .toArray();
  } catch (err) {
    throw new Error();
  }
};

const getContactById = async contactId => {
  try {
    return await db
      .collection('contacts')
      .findOne({ _id: mongodb.ObjectId(contactId) });
  } catch (err) {
    throw new Error(err.message || '');
  }
};

const postContact = async params => {
  const contact = new Contacts(params);
  try {
    return await db.collection('contacts').insertOne(contact);
  } catch (err) {
    throw new Error();
  }
};

const deleteContact = async contactId => {
  try {
    await db.collection('contacts').deleteOne({ _id: mongodb.ObjectId(contactId) });
    return { message: 'contact deleted' };
  } catch (err) {
    throw new Error(err.message || '');
  }
};

const updateContact = async (contactId, user) => {
  try {
    return await db
      .collection('contacts')
      .updateOne({ _id: mongodb.ObjectId(contactId) }, { $set: user });
  } catch (err) {
    throw new Error(err.message || '');
  }
};

module.exports = {
  listContacts,
  getContactById,
  deleteContact,
  postContact,
  updateContact,
};
