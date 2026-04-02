const express = require('express');
const router = express.Router();
const specialtyController = require('../controllers/specialties');

router.get('/', async (req, res) => {
  try {
    const specialties = await specialtyController.getAllSpecialties();
    res.send(specialties);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const specialty = await specialtyController.FindByID(req.params.id);
    if (!specialty) {
      return res.status(404).send({ message: "Specialty not found" });
    }
    res.send(specialty);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const savedSpecialty = await specialtyController.CreateSpecialty(req.body);
    res.send(savedSpecialty);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedSpecialty = await specialtyController.updateSpecialty(req.params.id, req.body);
    if (!updatedSpecialty) {
      return res.status(404).send({ message: "Specialty not found" });
    }
    res.send(updatedSpecialty);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedSpecialty = await specialtyController.deleteSpecialty(req.params.id);
    if (!deletedSpecialty) {
      return res.status(404).send({ message: "Specialty not found" });
    }
    res.send(deletedSpecialty);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
