const MedicalRecord = require('../schemas/medicalRecords');
require('../schemas/users'); // Đảm bảo model User đã đăng ký cho populate

const CreateMedicalRecord = async (data) => {
  const newMedicalRecord = new MedicalRecord(data);
  return await newMedicalRecord.save();
};

const FindByID = async (id) => {
  return await MedicalRecord.findOne({ _id: id, isDeleted: false });
};

const getAllMedicalRecords = async () => {
  const mongoose = require('mongoose');
  // Đảm bảo model User được khởi tạo để populate không bị lỗi
  if (!mongoose.models.User) {
    require('../schemas/users');
  }
  
  return await MedicalRecord.find({ isDeleted: false })
    .populate('patientId', 'fullName username')
    .populate('doctorId', 'fullName')
    .lean();
};

const updateMedicalRecord = async (id, data) => {
  return await MedicalRecord.findByIdAndUpdate(id, data, { new: true });
};

const deleteMedicalRecord = async (id) => {
  return await MedicalRecord.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
};

module.exports = {
  CreateMedicalRecord,
  FindByID,
  getAllMedicalRecords,
  updateMedicalRecord,
  deleteMedicalRecord
};
