const express = require('express');
const router = express.Router();
const upload = require('../utils/uploadHandler');

// Định nghĩa upload 1 ảnh (single) với field name là 'file' được gửi lên
router.post('/', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: "Không tìm thấy file tải lên" });
    }
    
    // Trả về một link xem ảnh trực tiếp
    const fileUrl = `http://localhost:3000/uploads/${req.file.filename}`;
    
    res.send({ 
      message: "Tải lên tệp tin thành công",
      url: fileUrl 
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
