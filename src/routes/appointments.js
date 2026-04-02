const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointments');

router.get('/', async (req, res) => {
  try {
    const appointments = await appointmentController.getAllAppointments();
    res.send(appointments);
  } catch (error) {
    res.send({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const appointment = await appointmentController.FindByID(req.params.id);
    if (!appointment) {
      return res.send({ message: "Appointment not found" });
    }
    res.send(appointment);
  } catch (error) {
    res.send({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const savedAppointment = await appointmentController.CreateAppointment(req.body);
    res.send(savedAppointment);
  } catch (error) {
    res.send({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedAppointment = await appointmentController.updateAppointment(req.params.id, req.body);
    if (!updatedAppointment) {
      return res.send({ message: "Appointment not found" });
    }
    res.send(updatedAppointment);
  } catch (error) {
    res.send({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedAppointment = await appointmentController.deleteAppointment(req.params.id);
    if (!deletedAppointment) {
      return res.send({ message: "Appointment not found" });
    }
    res.send(deletedAppointment);
  } catch (error) {
    res.send({ error: error.message });
  }
});

module.exports = router;
