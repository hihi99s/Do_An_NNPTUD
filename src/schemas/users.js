const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('./specialties'); // Đăng ký sơ đồ Specialty trước để Mongoose Populate không bị chết

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  fullName: {
    type: String,
    default: ""
  },
  role: {
    type: String,
    default: "PATIENT"
  },
  department: { type: String, default: "Khoa Nội Chuyên Sâu" },
  imageUrl: { type: String, default: 'https://cdn-icons-png.flaticon.com/512/3750/3750486.png' },
  specialtyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Specialty' },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// Mã hóa (hash) password trước khi lưu
userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

module.exports = mongoose.model('User', userSchema);
