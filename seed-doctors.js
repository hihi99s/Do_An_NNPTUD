const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/schemas/users');
const Specialty = require('./src/schemas/specialties');

const uri = 'mongodb://127.0.0.1:27017/MedicalBooking';

const doctorData = [
  { full: "PGS.TS. Trần Văn Tùng", dept: "Nội Tiết", img: "https://images.pexels.com/photos/8376277/pexels-photo-8376277.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { full: "ThS.BS. Nguyễn Phương Lan", dept: "Nhi Khoa", img: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { full: "BS.CKII. Lê Đình Hoàng", dept: "Ngoại Thần Kinh", img: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { full: "TS.BS. Phạm Hữu Tài", dept: "Chấn Thương Chỉnh Hình", img: "https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { full: "BS. Võ Thị Thanh Hải", dept: "Da Liễu", img: "https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { full: "BS.CKI. Vũ Hoàng Nam", dept: "Tai Mũi Họng", img: "https://images.pexels.com/photos/5214995/pexels-photo-5214995.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { full: "ThS.BS. Đỗ Quyên", dept: "Sản Phụ Khoa", img: "https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { full: "TS.BS. Hoàng Minh Trí", dept: "Tim Mạch", img: "https://images.pexels.com/photos/3714743/pexels-photo-3714743.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { full: "BS. Nguyễn Tuấn Kiệt", dept: "Mắt", img: "https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { full: "ThS.BS. Bùi Xuân Mai", dept: "Tiêu Hóa", img: "https://images.pexels.com/photos/5327653/pexels-photo-5327653.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { full: "GS.TS. Trịnh Hữu Lộc", dept: "Răng Hàm Mặt", img: "https://images.pexels.com/photos/5214997/pexels-photo-5214997.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { full: "BS. Đặng Ngọc Thu", dept: "Tâm Thần Kinh", img: "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=600" }
];

async function seed() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to DB...");

    const hashedPassword = await bcrypt.hash('123', 10);
    
    // Tạo sẵn 2 chuyên khoa mặc định
    let sp1 = await Specialty.findOne({ name: "Khoa Khám Bệnh Đa Khoa" });
    if(!sp1) sp1 = await Specialty.create({ name: "Khoa Khám Bệnh Đa Khoa", description: "Khám tổng quát mọi triệu chứng", imageUrl: "https://cdn-icons-png.flaticon.com/512/3209/3209114.png" });
    
    let sp2 = await Specialty.findOne({ name: "Khoa Cấp Cứu 24/7" });
    if(!sp2) sp2 = await Specialty.create({ name: "Khoa Cấp Cứu 24/7", description: "Túc trực ngày đêm ứng gọi", imageUrl: "https://cdn-icons-png.flaticon.com/512/2966/2966327.png" });
    
    const spArray = [sp1._id, sp2._id];

    let count = 0;
    for (let i = 0; i < doctorData.length; i++) {
      const d = doctorData[i];
      const un = "doctor_" + Date.now().toString().slice(-4) + "_" + i;
      const em = un + "@hospital.vn";
      
      const exists = await User.findOne({ fullName: d.full });
      if (!exists) {
        await User.create({
          username: un,
          password: hashedPassword,
          email: em,
          fullName: d.full,
          department: d.dept,
          role: "DOCTOR",
          imageUrl: d.img,
          specialtyId: spArray[i % 2]
        });
        count++;
      }
    }
    
    console.log(`Đã seed thành công ${count} bác sĩ mới toanh! Tất cả password là: 123`);
  } catch (e) {
    console.error("Lỗi:", e);
  } finally {
    mongoose.connection.close();
  }
}

seed();
