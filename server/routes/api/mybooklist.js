const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
// const config = require('config');
const { check, validationResult } = require('express-validator');

const db = require('../../config/db');

// @route   GET api/mybooklist
// @desc    get a user's booklist
// @access  Private
router.get('/', auth, async (req, res) => {
  // gets user id from auth middleware, fails if not authenticated
  try {
    const q = {
      user_id: req.user.id
    };

    const rows = await db.query(
      `SELECT id, book_list_name, created_at FROM book_list WHERE ?`,
      q
    );

    // returns empty array if user has no booklists
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/mybooklist
// @desc    create a new booklist
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const q = {
      book_list_name: req.body.name,
      user_id: req.user.id
    };

    const createBookListRes = await db.query(`INSERT INTO book_list SET ?`, q);
    const id = createBookListRes.insertId;

    // returns empty array if no id
    res.json(id);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
