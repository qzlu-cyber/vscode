const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
<<<<<<< HEAD
const jwt = require('jsonwebtoken');
const config = require('config');
=======
>>>>>>> ecc579d739f64b6dbf03506057e0c766947940d0

const { User, validate } = require('../models/user');

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('E-mail has registed.');

  user = new User(_.pick(req.body, ['name', 'email', 'password']));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

<<<<<<< HEAD
  const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));

  await user.save();

  res
    .header('x-auth-token', token)
    .send(_.pick(user, ['_id', 'name', 'email']));
=======
  await user.save();
  res.send(_.pick(user, ['_id', 'name', 'email']));
>>>>>>> ecc579d739f64b6dbf03506057e0c766947940d0
});

module.exports = router;
