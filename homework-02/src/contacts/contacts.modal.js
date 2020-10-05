const fsPromises = require('fs').promises;
const path = require('path');

const PATH = path.join(__dirname, '..', 'db', 'contacts.json');

class Contacts {
  constructor({ name, email, phone }) {
    this.id = Date.now();
    this.name = name;
    this.email = email;
    this.phone = phone;
  }
}

const listContacts = async () => {
  try {
    return await fsPromises.readFile(PATH, 'utf8');
  } catch (err) {
    console.log(err);
    throw new Error();
  }
};

const getContactById = async contactId => {
  try {
    const contacts = JSON.parse(await listContacts()).find(
      contact => contact.id === contactId,
    );
    return contacts || 'Не найдено контактов по заданому id';
  } catch (err) {
    throw new Error();
  }
};

const postContact = async params => {
  const contact = new Contacts(params);
  console.log(contact);

  try {
    const contacts = JSON.parse(await listContacts());
    await fsPromises.writeFile(
      PATH,
      JSON.stringify([...contacts, contact], null, 2),
    );
    return contact;
  } catch (err) {
    throw new Error();
  }
};

const deleteContact = async contactId => {
  try {
    const contacts = JSON.parse(await listContacts());

    if (!contacts.some(contact => contact.id === contactId))
      throw new Error('Not found');

    await fsPromises.writeFile(
      PATH,
      JSON.stringify(
        contacts.filter(contact => contact.id !== contactId),
        null,
        2,
      ),
      'utf8',
    );

    return {
      message: 'contact deleted',
    };
  } catch (err) {
    throw new Error(err.message ? err.message : '');
  }
};

const updateContact = async (contactId, user) => {
  console.log(contactId, user);
  try {
    const contacts = JSON.parse(await listContacts());
    const contactById = contacts.find(contact => contact.id === contactId);
    if (!contactById) throw new Error('Not found');

    const contactsUpdated = {
      ...contactById,
      ...user,
    };

    await fsPromises.writeFile(
      PATH,
      JSON.stringify(
        contacts.map(contact =>
          contact.id === contactsUpdated.id ? contactsUpdated : contact,
        ),
        null,
        2,
      ),
      'utf8',
    );

    return contactsUpdated;
  } catch (err) {
    throw new Error(err.message ? err.message : '');
  }
};

module.exports = {
  listContacts,
  getContactById,
  deleteContact,
  postContact,
  updateContact,
};
