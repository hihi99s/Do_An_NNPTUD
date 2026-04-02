const Banner = require('../schemas/banners');

const CreateBanner = async (data) => {
  const newBanner = new Banner(data);
  return await newBanner.save();
};

const FindByID = async (id) => {
  return await Banner.findOne({ _id: id, isDeleted: false });
};

const getAllBanners = async () => {
  return await Banner.find({ isDeleted: false });
};

const updateBanner = async (id, data) => {
  return await Banner.findByIdAndUpdate(id, data, { new: true });
};

const deleteBanner = async (id) => {
  return await Banner.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
};

module.exports = {
  CreateBanner,
  FindByID,
  getAllBanners,
  updateBanner,
  deleteBanner
};
