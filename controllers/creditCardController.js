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
        return res.status(400).json({
          response: 'missing data',
          success: false,
        });
      }
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          response: 'user dont finded',
          success: false,
        });
      }
      const hashedPin = await bcrypt.hashSync(PINNumber, 10);
      const CreditCard = await new CreditCardSchema({
        cardNumber: creditCard,
        PIN: hashedPin,
        founds,
      }).save();
      // eslint-disable-next-line no-underscore-dangle
      user.creditCards.push(CreditCard._id);
      user.save();
      await user.populate('creditCards');
      return res.status(200).json({
        response: user,
        success: true,
      });
    } catch (error) {
      return res.status(400).json({
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
