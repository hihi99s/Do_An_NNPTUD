const mongoose = require('mongoose');
const User = require('./src/schemas/users');
const Schedule = require('./src/schemas/schedules');

const uri = 'mongodb://127.0.0.1:27017/MedicalBooking';

const timeSlots = ["08:00 - 09:00", "09:30 - 10:30", "13:30 - 14:30", "15:00 - 16:00"];

async function seedSchedules() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to DB...");

    const doctors = await User.find({ role: 'DOCTOR', isDeleted: false });
    console.log(`Tìm thấy ${doctors.length} Bác sĩ. Đang nạp lịch...`);

    let count = 0;
    const today = new Date();
    
    for (const doc of doctors) {
      // Mỗi bác sĩ sẽ có lịch trong 3 ngày tới
      for (let i = 1; i <= 3; i++) {
        const dDate = new Date(today);
        dDate.setDate(today.getDate() + i); // Lịch ngày mai, mốt, kia
        
        // Random 1-3 ca trực mỗi ngày
        const numSlots = Math.floor(Math.random() * 3) + 1; 
        
        // Trộn ngẫu nhiên timeSlots
        const shuffledSlots = [...timeSlots].sort(() => 0.5 - Math.random()).slice(0, numSlots);

        for (const slot of shuffledSlots) {
          // Bơm lịch vào DB
          await Schedule.create({
            doctorId: doc._id,
            date: dDate,
            timeSlot: slot,
            isBooked: false
          });
          count++;
        }
      }
    }
    
    console.log(`Thành công! Đã lên sẵn ${count} Khung giờ lịch trực cho các Viện sĩ.`);
  } catch (e) {
    console.error("Lỗi:", e);
  } finally {
    mongoose.connection.close();
  }
}

seedSchedules();
