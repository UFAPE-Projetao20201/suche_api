const mongoose = require('../database');
const bcrypt = require('bcryptjs'); //criptografar senha

//Contruindo Modelo do Usuario
const UserSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  sobrenome: {
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
  telefone: {
    type: String,
    unique: true,
    required: true,
  },
  genero: {
    type: String,
    lowercase: true,
    required: true,
  },
  //Como Receber esses dados
  //PROVAVELMENTE MUDAR PARA  TYPE -> DATE
  dataNascimento: {
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
});

UserSchema.pre('save', async function(next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;