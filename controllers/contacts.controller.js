const { ObjectId } = require("mongodb");
const mongodb = require("../data/database");

const getAllContacts = async (req, res) => {
  try {
    // Validar conexión a DB
    const db = mongodb.getDatabase();
    if (!db) {
      return res.status(500).json({ message: "Database not connected" });
    }
    
    const contacts = await db.db("contactsProject")
      .collection("contacts")
      .find()
      .toArray();

    res.setHeader("Content-Type", "application/json");
    return res.status(200).json(contacts);
  } catch (err) {
    console.error("Error en getAllContacts:", err); 
    return res.status(500).json({
      message: err.message || "Some error occurred while retrieving contacts.",
    });
  }
};

const getContactById = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const db = mongodb.getDatabase().db("contactsProject");

    const contact = await db.collection("contacts").findOne({ _id: contactId });

    if (contact) {
      return res.status(200).json(contact);
    } else {
      return res.status(404).json({ message: "Contact not found" });
    }
  } catch (error) {
    const status =
      error.name === "BSONError" || error.message.includes("ObjectId")
        ? 400
        : 500;
    return res
      .status(status)
      .json({ message: error.message || "Internal server error" });
  }
};

const createContact = async (req, res) => {
  try {
    const contactInfo = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };

    if (!contactInfo.firstName || !contactInfo.email) {
      return res.status(400).json({
        error: "The fields first-name and email are required",
      });
    }

    contactInfo.email = contactInfo.email.toLowerCase().trim();

    console.log("Verificando email:", contactInfo.email);
    const existContact = await mongodb
      .getDatabase()
      .db("contactsProject")
      .collection("contacts")
      .findOne({ email: contactInfo.email });

    if (existContact) {
      return res.status(409).json({
        error: "This contact with this email already exists",
        existingContactId: existContact._id,
      });
    }

    const insert = await mongodb
      .getDatabase()
      .db("contactsProject")
      .collection("contacts")
      .insertOne(contactInfo);

    return res.status(201).json({
      message: "Contact was created successfully",
      contactId: insert.insertedId,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        error: "Duplicate key error: A contact with this email already exists",
      });
    }

    console.log(`Error by trying to create the contact: ${error}`);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const updateContact = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const contactInfo = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };

    const update = await mongodb
      .getDatabase()
      .db("contactsProject")
      .collection("contacts")
      .replaceOne({ _id: userId }, contactInfo);

    if (update.matchedCount === 0) {
      return res.status(404).json({
        error: "Contact Not Found",
      });
    }

    res.status(200).json({
      message: " Contact updated succesfully",
      modifiedCount: update.modifiedCount,
      contactId: userId,
    });
  } catch (error) {
    console.log("Error by trying update the contact", error);

    if (error.message.includes("ObjectId")) {
      return res.status(400).json({
        error: "The Id provided is not correct",
      });
    }

    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const deleteContact = async (req, res) => {
  try {
    console.log(`entrando a la funcion delete!`)
    const userId = new ObjectId(req.params.id.trim());

    const response = await mongodb
      .getDatabase()
      .db("contactsProject")
      .collection("contacts")
      .deleteOne({ _id: userId });

    if (response.deletedCount > 0) {
      return res.status(200).json({
        message: "Contact deleted successfully",
        idDeleted: userId,
      });
    } else {
      return res.status(404).json({
        message: "Contact not found",
      });
    }
  } catch (error)  {
    if (
      error.message.includes("BSONError") ||
      error.message.includes("ObjectId")
    ) {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};