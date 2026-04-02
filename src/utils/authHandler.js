const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'MedicalBookingSecretKey123';

const checkLogin = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).send({ message: "No token provided or invalid format" });
    }
    
    // Tách lấy token từ Bearer token
    const token = authHeader.split(' ')[1];
    
    // Xác thực token
    const decoded = jwt.verify(token, SECRET_KEY);
    
    // Gắn thông tin vừa giải mã được vào request để các middleware/controller sau có thể xài
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).send({ message: "Token has expired" });
    }
    return res.status(401).send({ message: "Invalid token" });
  }
};

const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    // Check xem user đã đi qua checkLogin chưa
    if (!req.user || !req.user.role) {
      return res.status(403).send({ message: "Access denied. No role found." });
    }
    
    // Check xem mảng allowedRoles có chứa role của user hiện hành không
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).send({ message: "Access denied. Insufficient permissions." });
    }
    
    next();
  };
};

module.exports = {
  checkLogin,
  checkRole,
  SECRET_KEY
};
