const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const sellerSchema = new schema({
  _id: {
    type: mongoose.Schema.Types.String,
    required: true,
    maxlength: 3
  },
  name: { type: String, required: true },
  password: { type: String, required: true, default: 'admin@123' }
});

// Encrypting Passwords
sellerSchema.methods.encryptPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

// Validating password
sellerSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('seller', sellerSchema);
