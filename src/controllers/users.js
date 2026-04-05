const User = require('../schemas/users');
const DoctorInfo = require('../schemas/doctorInfos');
const mongoose = require('mongoose');

// Các hàm thao tác Mongoose trực tiếp, tuyệt đối không dùng req, res
const CreateUser = async (data) => {
  // 1. Tạo User tài khoản
  const newUser = new User(data);
  const savedUser = await newUser.save();

  // 2. Nếu là DOCTOR, tự động tạo DoctorInfo (Hồ sơ chuyên môn)
  if (data.role === 'DOCTOR') {
    try {
      // Đảm bảo specialtyId là ObjectId hợp lệ
      const specialtyId = data.specialtyId ? new mongoose.Types.ObjectId(data.specialtyId) : null;
      
      if (specialtyId) {
        const newDoctorInfo = new DoctorInfo({
          userId: savedUser._id,
          specialtyId: specialtyId,
          experience_years: 5, // Mặc định 5 năm kinh nghiệm
          price: 150000,       // Giá khám mặc định 150k
          description: `Bác sĩ chuyên khoa giàu kinh nghiệm trực thuộc phòng khám.`
        });
        await newDoctorInfo.save();
      }
    } catch (err) {
      console.error("Lỗi tạo DoctorInfo kèm theo:", err.message);
      // Không ném lỗi ở đây để tránh làm hỏng việc tạo User chính, nhưng vẫn log để debug
    }
  }

  return savedUser;
};

const FindByID = async (id) => {
  return await User.findOne({ _id: id, isDeleted: false }).populate('specialtyId');
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
