const mongoose = require('../database');
var validate = require('mongoose-validator');

const EventSchema = new mongoose.Schema({
  promoter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    required: true,
  },
  keywords: [{
    type: String,
  }],
  localization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Localization",
  },
  link: {
    type: String,
  },
  isOnline: {
    type: Boolean,
    required: true,
  },
  isLocal: {
    type: Boolean,
    required: true,
  },
  ratings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rating"
  }],

  confirmedUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }]

});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
