const mongoose = require('../database');
var validate = require('mongoose-validator');

var phoneValidator = [
  validate({
    validator: 'isLength',
    arguments: [10, 11],
    message: 'Phone should have 10 or 11 characters'
  })
];

//Contruindo Modelo do Usuario
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    lowercase: true,
    select: false,
  },
  phone: {
    type: String,
    unique: true,
    required: true,
    validate: phoneValidator,
  },
  gender: {
    type: String,
    lowercase: true,
    required: true,
  },
  //Recebe os dados no padrão DATE
  birthDate: {
    type: Date,
    required: true,
  },
  passwordResetToken: {
    type: String,
    select: false,
  },
  passwordResetExpires: {
    type: Date,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  CPF_CNPJ: {
    type: String,
    unique: true,
  },
  isPromoter: {
    type: Boolean,
    default: false,
  },
  //Eventos que confirmou presenca, servira para possibilitar avaliações no futuro
  confirmedEvents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event"
  }]
});

UserSchema.pre('save', async function(next) {

  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;