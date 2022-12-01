/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcryptjs');
const User = require('../models/UserSchema');

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
        res.status(400).json({
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
        res.status(201).json({
          response: user,
          success: true,
        });
      }
    } catch (error) {
      res.status(400).json({
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
      const user = await User.findOne({ email }).populate('contacts').populate('creditCards');
      if (!user) {
        res.status(400).json({
          response: 'user dont find',
          success: false,
        });
      }
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

  login: async (req, res) => {
    const {
      email,
      password,
    } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({
          response: 'Unregistered user',
          success: false,
        });
      }
      const succesPass = bcrypt.compareSync(password, user.password);
      if (succesPass) {
        res.status(200).json({
          response: user,
          success: true,
        });
      }
      res.status(400).json({
        response: 'wrong password',
        success: false,
      });
    } catch (error) {
      res.status(400).json({
        response: error.message,
        success: false,
      });
    }
  },
};

module.exports = UserController;
