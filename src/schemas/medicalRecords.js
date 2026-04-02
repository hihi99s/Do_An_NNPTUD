const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
    required: true
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  diagnosis: {
    type: String,
    required: true
  },
  prescription: {
    type: String,
    required: true
  },
  attachmentUrl: {
    type: String,
    default: ""
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('MedicalRecord', medicalRecordSchema);
