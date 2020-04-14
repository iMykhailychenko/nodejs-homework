const fs = require('fs');
const path = require('path');

const contactsPath = path.join(__dirname, './db/contacts.json');


function getContactsFromFile(callback) {
  fs.readFile(contactsPath, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const parsedData = JSON.parse(data);
    callback(parsedData);
  });
}

function listContacts() {
  getContactsFromFile(console.log);
}

function getContactById(contactId) {
  const logContact = contacts => {
    const contactById = contacts.find(contact => contact.id === contactId);
    const contact = contactById || 'Не найдено контактов по заданому id';
    console.log(contact);
  };

  getContactsFromFile(logContact);
}

function removeContact(contactId) {
  const removeContactFromFile = contacts => {
    const contactInDB = contacts.some(contact => contact.id === contactId);
    if (!contactInDB) {
      console.log('Не найдено контактов по заданому id');
      return;
    }

    const clearedContacts = contacts.filter(
      contact => contact.id !== contactId,
    );
    const contactsToStr = JSON.stringify(clearedContacts, null, 2);

    fs.writeFile(contactsPath, contactsToStr, 'utf8', err => {
      if (err) throw err;
    });

    console.log('done');
  };

  getContactsFromFile(removeContactFromFile);
}

function addContact(name, email, phone) {
  const id = Date.now();
  const contact = {
    id,
    name,
    email,
    phone,
  };

  const addContactToFile = contacts => {
    const newContacts = [...contacts, contact];
    const newContactsStr = JSON.stringify(newContacts, null, 2);

    fs.writeFile(contactsPath, newContactsStr, 'utf8', err => {
      if (err) throw err;
    });

    console.log('done');
  };

  getContactsFromFile(addContactToFile);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
