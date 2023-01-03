/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcryptjs');
const CreditCardModel = require('../models/CreditCardsSchema');
const User = require('../models/UserSchema');
const Transaction = require('../models/TransactionsSchema');

const UserController = {

  createUser: async (req, res) => {
    const {
      name,
      lastName,
      email,
      password,
    } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          response: 'User already exists',
          success: false,
        });
      }
      const pass = bcrypt.hashSync(password, 10);
      if (!user) {
        user = await new User({
          name,
          lastName,
          email,
          password: pass,
        }).save();
        return res.status(201).json({
          response: user,
          success: true,
        });
      }
    } catch (error) {
      return res.status(400).json({
        response: error.message,
        success: false,
      });
    }
  },

  getUser: async (req, res) => {
    const {
      email,
    } = req.body;
    try {
      const user = await User.findOne({ email })
        .populate(['contacts', 'creditCards'])
        .populate({
          path: 'transactions',
          populate: ['to', 'from'],
        });
      if (!user) {
        return res.status(400).json({
          response: 'user dont find',
          success: false,
        });
      }
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

  login: async (req, res) => {
    const {
      email,
      password,
    } = req.body;
    try {
      const user = await User.findOne({ email }).select('+password')
        .populate(['contacts', 'creditCards'])
        .populate({
          path: 'transactions',
          populate: ['to', 'from'],
        });
      if (!user) {
        return res.status(400).json({
          response: 'Unregistered user',
          success: false,
        });
      }
      const succesPass = bcrypt.compareSync(password, user.password);
      if (succesPass) {
        return res.status(200).json({
          response: user,
          success: true,
        });
      }
      return res.status(400).json({
        response: 'wrong password',
        success: false,
      });
    } catch (error) {
      return res.status(400).json({
        response: error.message,
        success: false,
      });
    }
  },

  transaction: async (req, res) => {
    const {
      from,
      to,
      ammount,
      PIN,
    } = req.body;
    const totalAmmount = Number(ammount);
    let { date } = req.body;
    if (!date || date === undefined) {
      date = new Date();
    }
    try {
      const myCard = await CreditCardModel.findOne({ cardNumber: from });
      const herCard = await CreditCardModel.findOne({ cardNumber: to });
      if (!myCard && !herCard) {
        return res.status(400).json({
          response: 'cards dont exist',
          success: true,
        });
      }
      const verifyPin = bcrypt.compareSync(PIN, myCard.pin);
      if (verifyPin) {
        if (totalAmmount <= 0) {
          return res.status(400).json({
            response: 'ammount will be more than zero',
            success: false,
          });
        }
        if (myCard && herCard) {
          const myUser = await User.findOne({ creditCards: { $in: [myCard._id] } }).populate('creditCards');
          const herUser = await User.findOne({ creditCards: { $in: [herCard._id] } }).populate('creditCards');
          if (myCard.founds >= totalAmmount) {
            const transaction = await new Transaction({
              from: myUser,
              to: herUser,
              date,
              ammount,
              success: true,
            }).save();
            myCard.founds -= totalAmmount;
            herCard.founds += totalAmmount;
            myUser.transactions.push(transaction._id);
            herUser.transactions.push(transaction._id);
            myUser.save();
            herUser.save();
            myCard.save();
            herCard.save();
            return res.status(200).json({
              response: 'the transaction was completed successfully',
              success: true,
            });
          }
          return res.status(400).json({
            response: 'something was wrong',
            success: false,
          });
        }
        return res.status(400).json({
          response: 'wrong PIN',
          success: false,
        });
      }
    } catch (error) {
      return res.status(400).json({
        response: error.message,
        success: false,
      });
    }
  },
};

module.exports = UserController;
