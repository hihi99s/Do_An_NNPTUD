const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/schedules');

router.get('/', async (req, res) => {
  try {
    const schedules = await scheduleController.getAllSchedules();
    res.send(schedules);
  } catch (error) {
    res.send({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const schedule = await scheduleController.FindByID(req.params.id);
    if (!schedule) {
      return res.send({ message: "Schedule not found" });
    }
    res.send(schedule);
  } catch (error) {
    res.send({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const savedSchedule = await scheduleController.CreateSchedule(req.body);
    res.send(savedSchedule);
  } catch (error) {
    res.send({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedSchedule = await scheduleController.updateSchedule(req.params.id, req.body);
    if (!updatedSchedule) {
      return res.send({ message: "Schedule not found" });
    }
    res.send(updatedSchedule);
  } catch (error) {
    res.send({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedSchedule = await scheduleController.deleteSchedule(req.params.id);
    if (!deletedSchedule) {
      return res.send({ message: "Schedule not found" });
    }
    res.send(deletedSchedule);
  } catch (error) {
    res.send({ error: error.message });
  }
});

module.exports = router;
