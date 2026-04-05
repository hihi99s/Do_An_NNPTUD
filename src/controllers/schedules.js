const Schedule = require('../schemas/schedules');

const CreateSchedule = async (data) => {
  const newSchedule = new Schedule(data);
  return await newSchedule.save();
};

const FindByID = async (id) => {
  return await Schedule.findOne({ _id: id, isDeleted: false });
};

const getAllSchedules = async () => {
  const now = new Date();
  
  // Lấy tất cả chưa bị xóa để lọc chính xác bằng code (tránh lệch timezone)
  const rawSchedules = await Schedule.find({ isDeleted: false });

  return rawSchedules.filter(s => {
    const sDate = new Date(s.date);
    
    // Tạo format YYYYMMDD để so sánh số học (Đảm bảo chính xác 100% ngày)
    const d1 = sDate.getFullYear() * 10000 + (sDate.getMonth() + 1) * 100 + sDate.getDate();
    const d2 = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();

    if (d1 < d2) return false; // Quá khứ -> Ẩn
    if (d1 > d2) return true;  // Tương lai -> Hiện

    // Nếu là hôm nay, kiểm tra timeSlot (08:00 - 09:00)
    try {
      const startTimeStr = s.timeSlot.split(' - ')[0];
      const [h, m] = startTimeStr.split(':').map(Number);
      const slotTime = new Date();
      slotTime.setHours(h, m, 0, 0);
      return slotTime > now; 
    } catch(e) {
      return true;
    }
  });
};

const updateSchedule = async (id, data) => {
  return await Schedule.findByIdAndUpdate(id, data, { new: true });
};

const deleteSchedule = async (id) => {
  return await Schedule.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
};

module.exports = {
  CreateSchedule,
  FindByID,
  getAllSchedules,
  updateSchedule,
  deleteSchedule
};
