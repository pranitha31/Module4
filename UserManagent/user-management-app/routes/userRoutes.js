const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const userSchema = require('../validations/userValidation');
const Joi = require('joi');

// Validation middleware
const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

router.post('/', validate(userSchema), userController.createUser);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', validate(userSchema), userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
