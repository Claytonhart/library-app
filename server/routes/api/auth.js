const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const db = require('../../config/db');

// @route   GET api/auth
// @desc    Auth route
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    let user = await db.query(
      `SELECT id, username, email, created_at FROM users WHERE id="${req.user.id}"`
    );

    // returns empty array if no user
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await db.query(`SELECT * FROM users WHERE email="${email}"`);

      // check if user (email) exists
      if (!user[0]) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Email or password is incorrect' }] });
      }

      // password is plaintext entered by user, user.password is the encrypted pw from db
      const isMatch = await bcrypt.compare(password, user[0].password);

      // check if password is correct
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Email or password is incorrect' }] });
      }

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user[0].id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
