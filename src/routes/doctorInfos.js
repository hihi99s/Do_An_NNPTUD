const express = require('express');
const router = express.Router();
const doctorInfoController = require('../controllers/doctorInfos');

router.get('/', async (req, res) => {
  try {
    const doctorInfos = await doctorInfoController.getAllDoctorInfos();
    res.send(doctorInfos);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const doctorInfo = await doctorInfoController.FindByID(req.params.id);
    if (!doctorInfo) {
      return res.status(404).send({ message: "DoctorInfo not found" });
    }
    res.send(doctorInfo);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const savedDoctorInfo = await doctorInfoController.CreateDoctorInfo(req.body);
    res.send(savedDoctorInfo);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedDoctorInfo = await doctorInfoController.updateDoctorInfo(req.params.id, req.body);
    if (!updatedDoctorInfo) {
      return res.status(404).send({ message: "DoctorInfo not found" });
    }
    res.send(updatedDoctorInfo);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedDoctorInfo = await doctorInfoController.deleteDoctorInfo(req.params.id);
    if (!deletedDoctorInfo) {
      return res.status(404).send({ message: "DoctorInfo not found" });
    }
    res.send(deletedDoctorInfo);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
