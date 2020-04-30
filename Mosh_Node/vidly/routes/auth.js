const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');

const { User } = require('../models/user');

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('E-mail has not registed.');

  const validatePassword = await bcrypt.compare(req.body.password, user.password);
  if (!validatePassword) return res.status(400).send('Password or E-mail is not true.');

  res.send(true);
});

function validate(req) {
    const schema = {
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(50).required(),
    };
  
    return Joi.validate(req, schema);
  }

module.exports = router;
