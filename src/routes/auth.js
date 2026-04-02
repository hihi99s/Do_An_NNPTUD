const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Kiểm tra input cơ bản
    if (!username || !password) {
      return res.status(400).send({ message: "Vui lòng nhập đầy đủ username và password" });
    }
    
    // Controller sẽ ném lỗi nếu sai thông tin, và trả về object { user, token } nếu đúng
    const result = await authController.login(username, password);
    res.send({ message: "Đăng nhập thành công", ...result });
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
});

module.exports = router;
