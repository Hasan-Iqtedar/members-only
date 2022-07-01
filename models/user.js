const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, maxLength: 15, required: true },
  lastName: { type: String, maxLength: 15, required: true },
  username: { type: String, maxLength: 15, required: true },
  password: { type: String, required: true },
  isMember: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', userSchema);
