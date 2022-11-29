const mongoose = require('mongoose');

const CreditCardSchema = mongoose.Schema({
  cardNumber: { type: String, required: true },
  Pin: { type: Number, required: true },
  Ammount: { type: Number, required: true },
});

const CreditCardModel = mongoose.model('CreditCard', CreditCardSchema);
module.exports = CreditCardModel;
