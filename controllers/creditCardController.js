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

  removeCreditCard: async (req, res) => {
    const {
      id,
    } = req.body;
    try {
      const creditCard = await CreditCardSchema.findOne({ _id: id });
      const user = await User.findOne({ creditCards: { $in: [id] } });
      if (creditCard && user) {
        // eslint-disable-next-line no-underscore-dangle, eqeqeq
        const filteredUser = user.creditCards.filter((data) => data._id != id);
        await CreditCardSchema.findOneAndDelete({ _id: id });
        user.creditCards = filteredUser;
        user.save();
        return res.status(200).json({
          respose: 'Credit card was removed successfully',
          success: true,
        });
      }
      return res.status(400).json({
        response: 'Invalid card id',
        success: false,
      });
    } catch (error) {
      return res.status(400).json({
        response: error.message,
      });
    }
  },

  // eslint-disable-next-line consistent-return
  addFounds: async (req, res) => {
    const {
      id,
      ammount,
    } = req.body;
    const totalAmmount = Number(ammount);
    try {
      const creditCard = await CreditCardSchema.findById({ _id: id });
      creditCard.founds += totalAmmount;
      creditCard.save();
      if (creditCard) {
        return res.status(200).json({
          response: 'the money was successfully debited',
          success: true,
        });
      }
      res.status(400).json({
        response: 'Invalid CreditCard',
        success: false,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
      });
    }
  },
};

module.exports = creditCardsController;
