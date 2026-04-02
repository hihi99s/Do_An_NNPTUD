const Review = require('../schemas/reviews');

const CreateReview = async (data) => {
  const newReview = new Review(data);
  return await newReview.save();
};

const FindByID = async (id) => {
  return await Review.findOne({ _id: id, isDeleted: false });
};

const getAllReviews = async () => {
  return await Review.find({ isDeleted: false });
};

const updateReview = async (id, data) => {
  return await Review.findByIdAndUpdate(id, data, { new: true });
};

const deleteReview = async (id) => {
  return await Review.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
};

module.exports = {
  CreateReview,
  FindByID,
  getAllReviews,
  updateReview,
  deleteReview
};
