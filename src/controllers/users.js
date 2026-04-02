const User = require('../schemas/users');

// Các hàm thao tác Mongoose trực tiếp, tuyệt đối không dùng req, res
const CreateUser = async (data) => {
  const newUser = new User(data);
  return await newUser.save();
};

const FindByID = async (id) => {
  return await User.findOne({ _id: id, isDeleted: false });
};

const FindByUsername = async (username) => {
  return await User.findOne({ username: username, isDeleted: false });
};

const getAllUsers = async (query = {}) => {
  const { page = 1, limit = 5, search = '', role } = query;
  
  // Xây dựng bộ lọc
  const filter = { isDeleted: false };
  if (role) filter.role = role;
  if (search) filter.fullName = { $regex: search, $options: 'i' }; // Tìm phần chứa

  const pageInt = parseInt(page);
  const limitInt = parseInt(limit);
  const skip = (pageInt - 1) * limitInt;

  // Lệnh Mongoose Phân Trang & Populate liên kết Khoa
  const users = await User.find(filter)
      .populate('specialtyId', 'name')
      .skip(skip)
      .limit(limitInt);
  
  const totalItems = await User.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / limitInt);

  return { users, totalPages, currentPage: pageInt, totalItems };
};

const deleteUser = async (id) => {
  return await User.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
};

const updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};

module.exports = {
  CreateUser,
  FindByID,
  FindByUsername,
  getAllUsers,
  deleteUser,
  updateUser
};
