const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const fileData = JSON.parse(data);
    console.table(fileData);
  } catch (err) {
    console.log(err.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const fileData = JSON.parse(data);

    fileData.filter((contact) => {
      if (contactId === contact.id) {
        console.log(contact.name);
      }
    });
  } catch (err) {
    console.log(err.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const fileData = JSON.parse(data);

    let index = fileData.map((el) => el.id).indexOf(contactId);

    fileData.splice(index, 1);
    console.table(fileData);
    fs.writeFile("removeContact.js", JSON.stringify(fileData));
  } catch (err) {
    console.log(err.message);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const fileData = JSON.parse(data);

    const newContact = {
      id: `${fileData.length + 1}`,
      name,
      email,
      phone,
    };

    if (newContact.name && newContact.email && newContact.phone) {
      fileData.push(newContact);
    }
    console.table(fileData);
    fs.writeFile("addContact.js", JSON.stringify(fileData));
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
