const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const db = require('../../config/db');

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  '/',
  [
    check('username', 'username is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { username, email, password } = req.body;
    username = username.toLowerCase();

    try {
      let user = await db.query(
        `SELECT * FROM user WHERE username="${username}"`
      );

      // See if the user exists, return err if true
      if (user[0]) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const q = {
        username,
        email,
        password: hashedPassword
      };

      const createUserRes = await db.query(`INSERT INTO user SET ?`, q);
      const id = createUserRes.insertId;

      // Return jsonwebtoken
      const payload = {
        user: {
          id
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
