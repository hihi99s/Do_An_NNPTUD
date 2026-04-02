const DoctorInfo = require('../schemas/doctorInfos');

const CreateDoctorInfo = async (data) => {
  const newDoctorInfo = new DoctorInfo(data);
  return await newDoctorInfo.save();
};

const FindByID = async (id) => {
  return await DoctorInfo.findOne({ _id: id, isDeleted: false });
};

const getAllDoctorInfos = async () => {
  return await DoctorInfo.find({ isDeleted: false });
};

const updateDoctorInfo = async (id, data) => {
  return await DoctorInfo.findByIdAndUpdate(id, data, { new: true });
};

const deleteDoctorInfo = async (id) => {
  return await DoctorInfo.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
};

module.exports = {
  CreateDoctorInfo,
  FindByID,
  getAllDoctorInfos,
  updateDoctorInfo,
  deleteDoctorInfo
};
