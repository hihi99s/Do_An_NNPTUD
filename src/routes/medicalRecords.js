const express = require('express');
const router = express.Router();
const medicalRecordController = require('../controllers/medicalRecords');

router.get('/', async (req, res) => {
  try {
    const records = await medicalRecordController.getAllMedicalRecords();
    res.send(records);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const record = await medicalRecordController.FindByID(req.params.id);
    if (!record) {
      return res.status(404).send({ message: "Medical Record not found" });
    }
    res.send(record);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const savedRecord = await medicalRecordController.CreateMedicalRecord(req.body);
    res.send(savedRecord);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedRecord = await medicalRecordController.updateMedicalRecord(req.params.id, req.body);
    if (!updatedRecord) {
      return res.status(404).send({ message: "Medical Record not found" });
    }
    res.send(updatedRecord);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedRecord = await medicalRecordController.deleteMedicalRecord(req.params.id);
    if (!deletedRecord) {
      return res.status(404).send({ message: "Medical Record not found" });
    }
    res.send(deletedRecord);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
