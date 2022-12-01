const bcrypt = require('bcryptjs');
const User = require('../models/UserSchema');
const CreditCardSchema = require('../models/CreditCardsSchema');

const creditCardsController = {
  addCreditCard: async (req, res) => {
    const {
      email,
      creditCard,
      PINNumber,
      founds,
    } = req.body;

    try {
      if (!email || !creditCard || !founds || !PINNumber) {
        res.status(400).json({
          response: 'missing data',
          success: false,
        });
      }
      const user = await User.findOne({ email }).populate('creditCards');
      if (!user) {
        res.status(400).json({
          response: 'user dont finded',
          success: false,
        });
      }
      const encryptedCreditCard = await bcrypt.hashSync(creditCard, 10);
      const encryptedPin = await bcrypt.hashSync(PINNumber, 10);
      const encryptedFounds = await bcrypt.hashSync(founds, 10);
      const CreditCard = await new CreditCardSchema({
        cardNumber: encryptedCreditCard,
        PIN: encryptedPin,
        founds: encryptedFounds,
      }).save();
      // eslint-disable-next-line no-underscore-dangle
      user.creditCards.push(CreditCard._id);
      user.save();
      res.status(200).json({
        response: user,
        success: true,
      });
    } catch (error) {
      res.status(400).json({
        response: error.message,
        success: false,
      });
    }
  },

  // TO DO.

  // removeCreditCard: async (req, res) => {

  // },

  // addFounds: async (req, res) => {

  // },
};

module.exports = creditCardsController;
