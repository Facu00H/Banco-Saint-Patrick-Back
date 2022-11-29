/* eslint-disable no-undef */
const mongoose = require('mongoose');

const TransactionSchema = mongoose.Schema({
  date: { type: Date, required: true },
  type: { type: String, required: true },
  from: { type: mongoose.Types.ObjectId, required: true },
  to: { type: mongoose.Types.ObjectId, required: true },
  ammount: { type: Number, required: true },
  success: { type: Boolean, required: true },
});

const Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = Transaction;
