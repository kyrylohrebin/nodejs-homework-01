const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) throw error;
    console.table(JSON.parse(data));
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) throw error;
    const contactsList = JSON.parse(data);

    const contact = contactsList.find((contact) => {
      if (contact.id === contactId) {
        console.log("Contact By ID: ", contact);
        return contact;
      }
    });

    if (!contact) console.log(`Contact with ID "${contactId}" not found!`);
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) throw error;

    const contactsList = JSON.parse(data);

    const newContactsList = contactsList.filter(
      (contact) => contact.id !== contactId
    );

    if (newContactsList.length === contactsList.length) {
      console.log(
        `Contact with ID "${contactId}" don't removed! ID "${contactId}" not found!`
      );
      return;
    }

    console.log(`Contact id "${contactId}" deleted successfully!`);
    console.table(newContactsList);

    fs.writeFile(contactsPath, JSON.stringify(newContactsList), (error) => {
      if (error) throw error;
    });
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, (error, data) => {
    if (error) {
      console.error(error.message);
      throw error;
    }
    const contacts = JSON.parse(data.toString());
    const newContact = { id: uuidv4(), name, email, phone };
    const newContacts = [...contacts, newContact];
    fs.writeFile(contactsPath, JSON.stringify(newContacts), (error) => {
      if (error) throw error;
      return console.log(`Contact was added successfully`);
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
