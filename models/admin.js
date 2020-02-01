const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const adminSchema = new schema({
  _id: {
    type: mongoose.Schema.Types.String,
    required: true,
    match: /[A]([0-9]{0,2})/, // it ensures the A01,A02,A03,A04 regex
    maxlength: 3
  },
  name: { type: String, required: true },
  password: { type: String, required: true, default: 'admin@123' }
});

// Encrypting Passwords
userSchema.methods.encryptPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

// Validating password
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('admin', adminSchema);
