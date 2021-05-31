const mongoose = require('../database');
var validate = require('mongoose-validator');

const LocalSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  CEP: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  }
});

const Localization = mongoose.model('Localization', LocalSchema);

module.exports = Localization;