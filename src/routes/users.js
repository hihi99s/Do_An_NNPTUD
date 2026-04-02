const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

router.get('/', async (req, res) => {
  try {
    const users = await userController.getAllUsers(req.query);
    res.send(users);
  } catch (error) {
    res.send({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await userController.FindByID(req.params.id);
    if (!user) {
      return res.send({ message: "User not found" });
    }
    res.send(user);
  } catch (error) {
    res.send({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const result = await userController.CreateUser(req.body);
    res.send(result);
  } catch (error) {
    res.send({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await userController.deleteUser(req.params.id);
    if (!deletedUser) {
      return res.send({ message: "User not found" });
    }
    res.send(deletedUser); // Trả về data sau khi update isDeleted = true
  } catch (error) {
    res.send({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await userController.updateUser(req.params.id, req.body);
    if (!updatedUser) {
      return res.send({ message: "User not found" });
    }
    res.send(updatedUser);
  } catch (error) {
    res.send({ error: error.message });
  }
});

module.exports = router;
