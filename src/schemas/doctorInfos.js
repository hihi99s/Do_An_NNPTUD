const mongoose = require('mongoose');

const doctorInfoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  specialtyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Specialty',
    required: true
  },
  experience_years: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    default: 0
  },
  description: {
    type: String
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('DoctorInfo', doctorInfoSchema);
