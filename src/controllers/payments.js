const Payment = require('../schemas/payments');

const CreatePayment = async (data) => {
  const newPayment = new Payment(data);
  return await newPayment.save();
};

const FindByID = async (id) => {
  return await Payment.findOne({ _id: id, isDeleted: false });
};

const getAllPayments = async () => {
  return await Payment.find({ isDeleted: false });
};

const updatePayment = async (id, data) => {
  return await Payment.findByIdAndUpdate(id, data, { new: true });
};

const deletePayment = async (id) => {
  return await Payment.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
};

module.exports = {
  CreatePayment,
  FindByID,
  getAllPayments,
  updatePayment,
  deletePayment
};
