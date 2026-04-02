const Specialty = require('../schemas/specialties');

const CreateSpecialty = async (data) => {
  const newSpecialty = new Specialty(data);
  return await newSpecialty.save();
};

const FindByID = async (id) => {
  return await Specialty.findOne({ _id: id, isDeleted: false });
};

const getAllSpecialties = async () => {
  return await Specialty.find({ isDeleted: false });
};

const updateSpecialty = async (id, data) => {
  return await Specialty.findByIdAndUpdate(id, data, { new: true });
};

const deleteSpecialty = async (id) => {
  return await Specialty.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
};

module.exports = {
  CreateSpecialty,
  FindByID,
  getAllSpecialties,
  updateSpecialty,
  deleteSpecialty
};
