const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const env = require('../env');
const User = require('../models/user');

exports.signup = (req, res) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash
    });

    user.save().then(() => {
      res.status(201).json({
        message: 'Sign up successful!'
      });
    }).catch((error) => {
      res.status(500).json({
        error: new Error('Sign up failed')
      });
      Console.log(error);
    });
  }).catch((error) => {
    res.status(401).json({
      error: new Error('Wrong API call! Follow the documentation.')
    });
    Console.log(error);
  });
};

exports.login = (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      res.status(401).json({
        error: new Error('User not found!')
      });
    }

    bcrypt.compare(req.body.password, user.password).then((valid) => {
      if (!valid) {
        res.status(401).json({
          error: new Error('Login Details doesn\'t match!')
        });
      }

      const token = jwt.sign(
        // eslint-disable-next-line no-underscore-dangle
        { userId: user._id },
        env.TOKEN_ENCODING_STRING,
        { expiresIn: '24h ' }
      );

      res.status(200).json({
        // eslint-disable-next-line no-underscore-dangle
        userId: user._id,
        token
      });
    });
  });
};
