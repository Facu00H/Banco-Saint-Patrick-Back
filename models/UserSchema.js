/* eslint-disable no-undef */
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  email: {
    type: String,
    required: [true, 'El email es necesario'],
    unique: [true, 'El email esta duplicado'],
    // eslint-disable-next-line no-useless-escape
    match: [/.+\@.+\..+/, 'Por favor ingrese un correo'],
    maxLength: [100, 'El correo no debe exceder los 100 caracteres'],
  },
  password: {
    type: String,
    unique: true,
    minLength: [8, 'La contraseña debe tener mas de 8 caracteres'],
    select: false,
  },
  creditCards: [{
    type: mongoose.Types.ObjectId,
    required: false,
    ref: 'CreditCard',
  }],
  transactions: [{
    type: mongoose.Types.ObjectId,
    required: false,
  }],
  contacts: [{ type: mongoose.Types.ObjectId, ref: 'Contact', required: false }],
});

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
