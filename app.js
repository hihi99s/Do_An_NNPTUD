const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Cấu hình app.use
app.use(express.json());
app.use(cors());

// Public thư mục tĩnh
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/', express.static(path.join(__dirname, 'Frontend'), { extensions: ['html'] }));

const { checkLogin, checkRole } = require('./src/utils/authHandler');

// Kết nối mongoose tới MedicalBooking
mongoose.connect('mongodb://localhost:27017/MedicalBooking')
  .then(() => console.log('Successfully connected to MongoDB MedicalBooking'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Routes Bảo vệ Bằng Middleware (THEO ĐÚNG YÊU CẦU 3. PHÂN QUYỀN)
app.use('/admin', checkLogin, checkRole(['ADMIN']), require('./src/routes/users')); 
// Bác sĩ cần thấy Lịch của mình, Bệnh nhân xem lịch của mình, Admin xem lịch tất cả
app.use('/appointments', checkLogin, checkRole(['PATIENT', 'DOCTOR', 'ADMIN']), require('./src/routes/appointments'));

// Các Routes Công Khai Hoặc Chờ Bảo Vệ Khác
app.use('/users', require('./src/routes/users'));
app.use('/schedules', require('./src/routes/schedules'));
app.use('/medical-records', require('./src/routes/medicalRecords'));
app.use('/reviews', require('./src/routes/reviews'));
app.use('/payments', require('./src/routes/payments'));
app.use('/roles', require('./src/routes/roles'));
app.use('/banners', require('./src/routes/banners'));
app.use('/specialties', require('./src/routes/specialties'));
app.use('/doctor-info', require('./src/routes/doctorInfos'));
app.use('/auth', require('./src/routes/auth'));
app.use('/upload', require('./src/routes/upload'));

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
