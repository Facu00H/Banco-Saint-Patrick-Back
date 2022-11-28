/* eslint-disable no-undef */
const mongoose = require('mongoose');

const UserSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  creditCards: [{ type: String, required: true }],
  transactions: { Object },
});

const UserModel = mongoose.model('User', UserSchema);
exports.default = UserModel;
