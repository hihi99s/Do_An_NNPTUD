const Appointment = require('../schemas/appointments');
const Schedule = require('../schemas/schedules');

const CreateAppointment = async (data) => {
  // 1. Kiểm tra khung giờ này có tồn tại không và trạng thái Bác sĩ
  const targetSchedule = await Schedule.findById(data.scheduleId);
  if (!targetSchedule) throw new Error("Mã Khung giờ không tồn tại trong hệ thống.");
  if (targetSchedule.isBooked) throw new Error("Bác sĩ đã có khách đặt trước chặn vào khung giờ này!");

  // 2. Chặn Xung đột 2 mặt: Bệnh nhân cũ đặt đè 2 bác sĩ cùng một thời điểm
  const existingPatientAppts = await Appointment.find({
    patientId: data.patientId,
    status: { $in: ['PENDING', 'CONFIRMED'] },
    isDeleted: false
  }).populate('scheduleId');

  for (let apt of existingPatientAppts) {
    if (apt.scheduleId && apt.scheduleId.date.toString() === targetSchedule.date.toString() && apt.scheduleId.timeSlot === targetSchedule.timeSlot) {
      throw new Error("LỖI XUNG ĐỘT: Bệnh nhân đã hẹn với một bác sĩ khác vào đúng ngày và khung giờ này.");
    }
  }

  // 3. Nếu toàn bộ quy trình hợp lệ -> Lưu Dữ liệu
  const newAppointment = new Appointment(data);
  await newAppointment.save();

  // 4. Update isBooked lên true
  targetSchedule.isBooked = true;
  await targetSchedule.save();

  return newAppointment;
};

const FindByID = async (id) => {
  return await Appointment.findOne({ _id: id, isDeleted: false });
};

const getAllAppointments = async () => {
  return await Appointment.find({ isDeleted: false })
      .populate({ 
          path: 'doctorId', 
          select: 'fullName imageUrl specialtyId',
          populate: { path: 'specialtyId', model: 'Specialty', select: 'name' } 
      })
      .populate('patientId', 'fullName email')
      .populate('scheduleId', 'date timeSlot');
};

const updateAppointment = async (id, data) => {
  const oldAppt = await Appointment.findById(id);
  const updatedAppt = await Appointment.findByIdAndUpdate(id, data, { new: true });
  
  // Nếu chuyển trạng thái sang CANCELLED thì giải phóng slot (Bỏ qua check status cũ để sửa lỗi kẹt dữ liệu)
  if (data.status === 'CANCELLED' && oldAppt) {
    console.log('Phát hiện HỦY lịch - Đang giải phóng Slot:', oldAppt.scheduleId);
    await Schedule.findByIdAndUpdate(oldAppt.scheduleId, { isBooked: false });
  }

  // Nếu chuyển từ CANCELLED ngược lại PENDING/CONFIRMED thì phải chiếm lại slot (nếu còn trống)
  if (oldAppt && oldAppt.status === 'CANCELLED' && (data.status === 'PENDING' || data.status === 'CONFIRMED')) {
    const targetSchedule = await Schedule.findById(oldAppt.scheduleId);
    if (targetSchedule && !targetSchedule.isBooked) {
      targetSchedule.isBooked = true;
      await targetSchedule.save();
    } else {
      throw new Error("Không thể khôi phục lịch hẹn vì khung giờ này đã có người khác đặt!");
    }
  }

  return updatedAppt;
};

const deleteAppointment = async (id) => {
  const appt = await Appointment.findById(id);
  if (appt && appt.scheduleId) {
    // Giải phóng khung giờ khi xóa lịch hẹn
    await Schedule.findByIdAndUpdate(appt.scheduleId, { isBooked: false });
  }

  return await Appointment.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
};

module.exports = {
  CreateAppointment,
  FindByID,
  getAllAppointments,
  updateAppointment,
  deleteAppointment
};
