const MedicalRecord = require('../schemas/medicalRecords');

const CreateMedicalRecord = async (data) => {
  const newMedicalRecord = new MedicalRecord(data);
  return await newMedicalRecord.save();
};

const FindByID = async (id) => {
  return await MedicalRecord.findOne({ _id: id, isDeleted: false });
};

const getAllMedicalRecords = async () => {
  return await MedicalRecord.find({ isDeleted: false });
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
