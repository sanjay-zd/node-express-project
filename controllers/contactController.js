const asyncHandler = require("express-async-handler");
const Contact = require('../models/contactModel')

// Get all the contacts
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find()
  console.log(contacts);
  res.status(200).json(contacts);
});

// Create a contact
const createContact = asyncHandler(async (req, res) => {
  console.log("request is here", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are madatory!");
  }
  
  const contact = await Contact.create({
    name,
    email,
    phone
  })
  res.status(201).json(contact);
});

// Get one contact by id
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if(!contact){
    res.status(400);
    throw new Error("contact not found");
  }
  res.status(200).json(contact);
});

// Update a contact by id
const updateContact = asyncHandler(async (req, res) => {

  const contact = await Contact.findById(req.params.id);
  if(!contact){
    res.status(400);
    throw new Error("contact not found");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true}
  )
  res.status(200).json(updatedContact);
});

// Delete a contact by id
const deleteContact = asyncHandler(async (req, res) => {

  const contact = await Contact.findById(req.params.id);
  if(!contact){
    res.status(400);
    throw new Error("contact not found");
  }
  await Contact.deleteOne({"_id":req.params.id})
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  createContact,
  updateContact,
  getContact,
  deleteContact,
};
