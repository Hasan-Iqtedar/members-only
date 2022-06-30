const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model(
  'Message',
  new Schema({
    title: { type: String, maxlength: 30, required: true },
    text: { type: String },
    timestamp: new Date(),
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  })
);
