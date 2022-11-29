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
      if (!user) {
        user = await new User({
          name,
          lastName,
          email,
          password,
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
};

module.exports = UserController;
