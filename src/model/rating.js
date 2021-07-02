const mongoose = require('../database');
var validate = require('mongoose-validator');

const RatingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  security: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  quality: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  faithfulness: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  description: {
    type: String,
    default: ""
  }

});

const Rating = mongoose.model('Rating', RatingSchema);

module.exports = Rating;
