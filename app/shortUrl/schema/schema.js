const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const shortUrl = new Schema({
  domain: { type: String },
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('shortUrl', shortUrl);
