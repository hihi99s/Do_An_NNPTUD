const Schedule = require('../schemas/schedules');

const CreateSchedule = async (data) => {
  const newSchedule = new Schedule(data);
  return await newSchedule.save();
};

const FindByID = async (id) => {
  return await Schedule.findOne({ _id: id, isDeleted: false });
};

const getAllSchedules = async () => {
  return await Schedule.find({ isDeleted: false });
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
