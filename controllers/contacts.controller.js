const mongodb = require('../data/database');
const objectId = require('mongodb').ObjectId;

const getAllContacts = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db('contactsProject').collection('contacts').find();

        result.toArray().then((contacts) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(contacts);
        });
    } catch (err) {
        res.status(500).json({ message: err.message || "Some error occurred while retrieving contacts." });
    }
};

const getContactById = async (req, res) => {
    try {
        const contactId = new objectId(req.params.id);
        const result = await mongodb
            .getDatabase()
            .db('contactsProject')
            .collection('contacts')
            .find({ _id: contactId });

        result.toArray().then((contacts) => {
            if (contacts.length > 0) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(contacts[0]);
            } else {
                res.status(404).json({ message: "Contact not found" });
            }
        }).catch((err) => {
            console.error('Error processing contact data:', err);
            res.status(500).json({
                message: err.message || "Internal server error while processing contact data"
            });
        });
    } catch (error) {
        if (error.name === 'BSONError' || error.message.includes('ObjectId') || error.message.includes('cast')) {
            res.status(400).json({ message: "Invalid ID format" });
        } else {
            console.error('Unexpected error in getContactById:', error);
            res.status(500).json({
                message: error.message || "Internal server error"
            });
        }
    }
};

module.exports = {
    getAllContacts,
    getContactById
};