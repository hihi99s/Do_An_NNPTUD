const mongoose = require('mongoose');

const specialtySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  imageUrl: {
    type: String,
    default: "https://default-image.png"
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Specialty', specialtySchema);
