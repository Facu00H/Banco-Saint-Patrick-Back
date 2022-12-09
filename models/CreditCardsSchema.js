const mongoose = require('mongoose');

const CreditCardSchema = mongoose.Schema({
  cardNumber: { type: String, required: true },
  PIN: { type: String, required: true },
  founds: { type: Number, required: true },
});

const CreditCardModel = mongoose.model('CreditCard', CreditCardSchema);
module.exports = CreditCardModel;
