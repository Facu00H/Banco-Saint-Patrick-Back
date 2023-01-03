const bcrypt = require('bcryptjs');
const User = require('../models/UserSchema');
const Contact = require('../models/ContactSchema');

const contactController = {

  addContact: async (req, res) => {
    const {
      email,
      contact,
    } = req.body;

    if (!contact.name || !contact.cardNumber) {
      return res.status(400).json({
        response: 'Please insert all the data',
        success: false,
      });
    }
    try {
      const newContact = await new Contact({
        name: contact.name,
        cardNumber: bcrypt.hashSync(contact.cardNumber, 10),
      }).save();
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          response: 'The email its not valid',
          success: false,
        });
      }
      // eslint-disable-next-line no-underscore-dangle
      user.contacts.push(newContact._id);
      user.save();
      return res.status(200).json({
        response: `The contact ${contact.name} was added succesfully`,
        user,
        success: true,
      });
    } catch (error) {
      return res.status(400).json({
        response: error.message,
        success: false,
      });
    }
  },

  deleteContact: async (req, res) => {
    const {
      email,
      id,
    } = req.body;
    try {
      const user = await Contact.findOne({ email });
      if (user) {
        await User.updateOne({ email }, {
          $pullAll: {
            contacts: [{ _id: id }],
          },
        });
        await Contact.findOneAndDelete({ _id: id });
        res.status(200).json({
          response: 'The contact was removed',
          success: true,
        });
      }
      return res.status(400).json({
        response: 'something was wrong',
        success: false,
      });
    } catch (error) {
      return res.status(400).json({
        response: error.message,
        success: false,
      });
    }
  },
};

module.exports = contactController;
