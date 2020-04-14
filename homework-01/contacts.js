const fsPromises = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, './db/contacts.json');

function getContactsFromFile() {
  return fsPromises
    .readFile(contactsPath, 'utf8')
    .then(contacts => JSON.parse(contacts))
    .catch(err => console.log(err));
}

function listContacts() {
  getContactsFromFile().then(data => console.log(data));
}

function getContactById(contactId) {
  getContactsFromFile().then(contacts => {
    const contactById = contacts.find(contact => contact.id === contactId);
    const contact = contactById || 'Не найдено контактов по заданому id';
    console.log(contact);
  });
}

function removeContact(contactId) {
  getContactsFromFile().then(contacts => {
    const contactInDB = contacts.some(contact => contact.id === contactId);
    if (!contactInDB) {
      console.log('Не найдено контактов по заданому id');
      return;
    }

    const clearedContacts = contacts.filter(
      contact => contact.id !== contactId,
    );
    const contactsToStr = JSON.stringify(clearedContacts, null, 2);

    fsPromises
      .writeFile(contactsPath, contactsToStr, 'utf8')
      .catch(err => console.log(err));

    console.log('done');
  });
}

function addContact(name, email, phone) {
  const id = Date.now();
  const contact = {
    id,
    name,
    email,
    phone,
  };

  getContactsFromFile().then(contacts => {
    const newContacts = [...contacts, contact];
    const newContactsStr = JSON.stringify(newContacts, null, 2);

    fsPromises
      .writeFile(contactsPath, newContactsStr, 'utf8')
      .catch(err => console.log(err));

    console.log('done');
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
