const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviews');

router.get('/', async (req, res) => {
  try {
    const reviews = await reviewController.getAllReviews();
    res.send(reviews);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const review = await reviewController.FindByID(req.params.id);
    if (!review) {
      return res.status(404).send({ message: "Review not found" });
    }
    res.send(review);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const savedReview = await reviewController.CreateReview(req.body);
    res.send(savedReview);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedReview = await reviewController.updateReview(req.params.id, req.body);
    if (!updatedReview) {
      return res.status(404).send({ message: "Review not found" });
    }
    res.send(updatedReview);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedReview = await reviewController.deleteReview(req.params.id);
    if (!deletedReview) {
      return res.status(404).send({ message: "Review not found" });
    }
    res.send(deletedReview);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
