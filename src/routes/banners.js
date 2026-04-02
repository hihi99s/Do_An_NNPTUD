const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/banners');

router.get('/', async (req, res) => {
  try {
    const banners = await bannerController.getAllBanners();
    res.send(banners);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const banner = await bannerController.FindByID(req.params.id);
    if (!banner) {
      return res.status(404).send({ message: "Banner not found" });
    }
    res.send(banner);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const savedBanner = await bannerController.CreateBanner(req.body);
    res.send(savedBanner);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedBanner = await bannerController.updateBanner(req.params.id, req.body);
    if (!updatedBanner) {
      return res.status(404).send({ message: "Banner not found" });
    }
    res.send(updatedBanner);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedBanner = await bannerController.deleteBanner(req.params.id);
    if (!deletedBanner) {
      return res.status(404).send({ message: "Banner not found" });
    }
    res.send(deletedBanner);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
