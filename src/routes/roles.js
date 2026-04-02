const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roles');

router.get('/', async (req, res) => {
  try {
    const roles = await roleController.getAllRoles();
    res.send(roles);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const role = await roleController.FindByID(req.params.id);
    if (!role) {
      return res.status(404).send({ message: "Role not found" });
    }
    res.send(role);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const savedRole = await roleController.CreateRole(req.body);
    res.send(savedRole);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedRole = await roleController.updateRole(req.params.id, req.body);
    if (!updatedRole) {
      return res.status(404).send({ message: "Role not found" });
    }
    res.send(updatedRole);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedRole = await roleController.deleteRole(req.params.id);
    if (!deletedRole) {
      return res.status(404).send({ message: "Role not found" });
    }
    res.send(deletedRole);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
