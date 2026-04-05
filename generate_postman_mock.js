const fs = require('fs');

const baseUrl = "http://localhost:3000";

const dummyData = {
  "Người dùng (Users)": {
    "username": "nguyenvana",
    "password": "123",
    "email": "vana@example.com",
    "fullName": "Nguyễn Văn A",
    "role": "PATIENT",
    "department": "Khoa Nội Chuyên Sâu",
    "imageUrl": "https://cdn-icons-png.flaticon.com/512/3750/3750486.png"
  },
  "Quản trị viên (Admin)": {
    "username": "admin01",
    "password": "123",
    "email": "admin01@example.com",
    "fullName": "Quản trị viên",
    "role": "ADMIN",
    "department": "",
    "imageUrl": "https://cdn-icons-png.flaticon.com/512/3750/3750486.png"
  },
  "Cuộc hẹn (Appointments)": {
    "patientId": "603d2b... (Thay ID người bệnh)",
    "doctorId": "603d2c... (Thay ID bác sĩ)",
    "scheduleId": "603d2d... (Thay ID lịch khám)",
    "symptoms": "Đau đầu, sốt cao",
    "status": "PENDING"
  },
  "Lịch khám (Schedules)": {
    "doctorId": "603d2c... (Thay ID bác sĩ)",
    "date": "2024-05-20",
    "timeSlot": "08:00 - 09:00",
    "isBooked": false
  },
  "Thông tin bác sĩ (Doctor Infos)": {
    "userId": "603d2c... (Thay ID Bác sĩ)",
    "specialtyId": "603d2e... (Thay ID Chuyên khoa)",
    "experience_years": 5,
    "price": 250000,
    "description": "Bác sĩ ưu tú có nhiều năm kinh nghiệm tại bệnh viện lớn."
  },
  "Chuyên khoa (Specialties)": {
    "name": "Khoa Tim Mạch",
    "description": "Chuyên điều trị các bệnh lý về tim.",
    "imageUrl": "https://example.com/tim-mach.jpg"
  },
  "Hồ sơ bệnh án (Medical Records)": {
    "appointmentId": "603d2f... (Thay ID Cuộc hẹn)",
    "patientId": "603d2b... (Thay ID Người bệnh)",
    "doctorId": "603d2c... (Thay ID Bác sĩ)",
    "diagnosis": "Sốt virus",
    "prescription": "Uống thuốc đúng liều ngày 2 lần",
    "attachmentUrl": "https://example.com/don-thuoc.pdf"
  },
  "Thanh toán (Payments)": {
    "appointmentId": "603d2f... (Thay ID Cuộc hẹn)",
    "patientId": "603d2b... (Thay ID Người bệnh)",
    "amount": 250000,
    "paymentMethod": "TRANSFER",
    "status": "PAID"
  },
  "Đánh giá (Reviews)": {
    "appointmentId": "603d2f... (Thay ID Cuộc hẹn)",
    "patientId": "603d2b... (Thay ID Người bệnh)",
    "doctorId": "603d2c... (Thay ID Bác sĩ)",
    "rating": 5,
    "comment": "Bác sĩ rất thân thiện và chu đáo!"
  },
  "Biểu ngữ quảng cáo (Banners)": {
    "title": "Chương trình khám sức khỏe tổng quát",
    "imageUrl": "https://example.com/banner-summer.jpg",
    "isActive": true
  },
  "Vai trò (Roles)": {
    "name": "ADMIN",
    "description": "Người quản trị tối cao của hệ thống"
  }
};

const createCrudItems = (folderName, path) => {
  const dummyString = JSON.stringify(dummyData[folderName], null, 2);
  const actionPrefix = folderName.split(' ')[0] === "Nhưng" ? "" : ""; // Just skip mapping logic
  
  return {
    name: folderName,
    item: [
      {
        name: `Lấy tất cả ${folderName.split(' (')[0].toLowerCase()}`,
        request: { method: "GET", url: `${baseUrl}${path}`, header: [] }
      },
      {
        name: `Lấy ${folderName.split(' (')[0].toLowerCase()} theo ID`,
        request: { method: "GET", url: `${baseUrl}${path}/:id`, header: [] }
      },
      {
        name: `Tạo ${folderName.split(' (')[0].toLowerCase()} mới`,
        request: { 
          method: "POST", 
          url: `${baseUrl}${path}`, 
          header: [{key: "Content-Type", value: "application/json"}],
          body: { mode: "raw", raw: dummyString }
        }
      },
      {
        name: `Cập nhật ${folderName.split(' (')[0].toLowerCase()}`,
        request: { 
          method: "PUT", 
          url: `${baseUrl}${path}/:id`, 
          header: [{key: "Content-Type", value: "application/json"}],
          body: { mode: "raw", raw: dummyString }
        }
      },
      {
        name: `Xóa ${folderName.split(' (')[0].toLowerCase()}`,
        request: { method: "DELETE", url: `${baseUrl}${path}/:id`, header: [] }
      }
    ]
  };
};

const collection = {
  info: {
    name: "MedicalBooking API (Đã điền sẵn Body)",
    schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  item: [
    {
      name: "Xác thực (Auth)",
      item: [
        {
          "name": "Đăng nhập",
          "request": {
            "method": "POST",
            "url": "http://localhost:3000/auth/login",
            "header": [{"key": "Content-Type", "value": "application/json"}],
            "body": {
              "mode": "raw",
              "raw": JSON.stringify({ username: "admin@gmail.com", password: "123" }, null, 2)
            }
          }
        }
      ]
    },
    {
      "name": "Tải file (Upload)",
      item: [
        {
          "name": "Tải file lên hệ thống",
          "request": {
            "method": "POST",
            "url": "http://localhost:3000/upload",
            "header": [],
            "body": {
              "mode": "formdata",
              "formdata": [
                {
                  "key": "file",
                  "type": "file",
                  "src": ""
                }
              ]
            }
          }
        }
      ]
    },
    createCrudItems("Người dùng (Users)", "/users"),
    createCrudItems("Quản trị viên (Admin)", "/admin"),
    createCrudItems("Cuộc hẹn (Appointments)", "/appointments"),
    createCrudItems("Lịch khám (Schedules)", "/schedules"),
    createCrudItems("Thông tin bác sĩ (Doctor Infos)", "/doctor-info"),
    createCrudItems("Chuyên khoa (Specialties)", "/specialties"),
    createCrudItems("Hồ sơ bệnh án (Medical Records)", "/medical-records"),
    createCrudItems("Thanh toán (Payments)", "/payments"),
    createCrudItems("Đánh giá (Reviews)", "/reviews"),
    createCrudItems("Biểu ngữ quảng cáo (Banners)", "/banners"),
    createCrudItems("Vai trò (Roles)", "/roles")
  ]
};

fs.writeFileSync('d:/MedicalBooking/MedicalBooking_Mock.postman_collection.json', JSON.stringify(collection, null, 2));
