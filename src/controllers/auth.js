const User = require('../schemas/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../utils/authHandler');

const login = async (username, password) => {
  // Tìm user và phải là user chưa bị dán mác isDeleted
  const user = await User.findOne({ username: username, isDeleted: false });
  if (!user) {
    throw new Error("Tài khoản không tồn tại hoặc đã bị khóa");
  }

  // So sánh mật khẩu bằng bcrypt
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Mật khẩu không chính xác");
  }

  // Nếu mật khẩu khớp -> Sinh token
  const roleStr = user.role || 'PATIENT';
  const tokenPayload = {
    id: user._id,
    username: user.username,
    role: roleStr
  };
  
  // Thời hạn token là 1 ngày
  const token = jwt.sign(tokenPayload, SECRET_KEY, { expiresIn: '1d' });

  // Loại bỏ password trả về cho client để bảo mật
  const userWithoutPassword = user.toObject();
  delete userWithoutPassword.password;
  if (!userWithoutPassword.role) userWithoutPassword.role = 'PATIENT';

  return {
    user: userWithoutPassword,
    token: token
  };
};

module.exports = {
  login
};
