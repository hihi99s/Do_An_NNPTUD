const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payments');

router.get('/', async (req, res) => {
  try {
    const payments = await paymentController.getAllPayments();
    res.send(payments);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const payment = await paymentController.FindByID(req.params.id);
    if (!payment) {
      return res.status(404).send({ message: "Payment not found" });
    }
    res.send(payment);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const savedPayment = await paymentController.CreatePayment(req.body);
    res.send(savedPayment);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedPayment = await paymentController.updatePayment(req.params.id, req.body);
    if (!updatedPayment) {
      return res.status(404).send({ message: "Payment not found" });
    }
    res.send(updatedPayment);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedPayment = await paymentController.deletePayment(req.params.id);
    if (!deletedPayment) {
      return res.status(404).send({ message: "Payment not found" });
    }
    res.send(deletedPayment);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
