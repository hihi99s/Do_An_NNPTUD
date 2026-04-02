const Role = require('../schemas/roles');

const CreateRole = async (data) => {
  const newRole = new Role(data);
  return await newRole.save();
};

const FindByID = async (id) => {
  return await Role.findOne({ _id: id, isDeleted: false });
};

const getAllRoles = async () => {
  return await Role.find({ isDeleted: false });
};

const updateRole = async (id, data) => {
  return await Role.findByIdAndUpdate(id, data, { new: true });
};

const deleteRole = async (id) => {
  return await Role.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
};

module.exports = {
  CreateRole,
  FindByID,
  getAllRoles,
  updateRole,
  deleteRole
};
