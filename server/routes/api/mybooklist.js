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
    console.log(createBookListRes);
    console.log(id);

    // returns empty array if no id
    res.json(id);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/mybooklist/:booklistId
// @desc    add a book_list_book to a booklist
// @access  Private
router.post('/:booklistId', auth, async (req, res) => {
  try {
    const bookQ = { google_id: req.body.google_id };
    let book_id = await db.query(`SELECT id FROM book WHERE ?`, bookQ);
    console.log(book_id);

    if (book_id.length === 0) {
      let bookInfo = {
        google_id: req.body.google_id,
        title: req.body.title,
        description: req.body.description,
        isbn10: req.body.isbn10 || null,
        isbn13: req.body.isbn13 || null,
        thumbnail: req.body.image
      };
      let book_id_res = await db.query(`INSERT INTO book SET ?`, bookInfo);
      console.log(book_id_res);
      book_id = book_id_res.insertId;
    } else {
      book_id = book_id[0].id;
    }
    console.log(book_id);

    const q = {
      book_list_id: req.params.booklistId,
      book_id: book_id,
      user_id: req.user.id
    };

    const bookListBookRes = await db.query(
      `INSERT INTO book_list_book SET ?`,
      q
    );
    const id = bookListBookRes.insertId;

    // returns empty array if no id
    res.json(id);
    // res.json(id);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/mybooklist/contains/:bookId
// @desc    check if a book_list_book is in the book_list
// @access  Private
router.get('/contains/:bookId', auth, async (req, res) => {
  try {
    const q = {
      user_id: req.user.id
    };

    const rows = await db.query(
      `SELECT id, book_list_name, created_at FROM book_list WHERE ?`,
      q
    );

    let bookListRes = await db.query(
      `SELECT book_list_id FROM book_list_book JOIN book ON book_list_book.book_id=book.id WHERE book.google_id=? AND book_list_book.user_id=?`,
      [req.params.bookId, req.user.id]
    );

    let ids = [];
    for (let book of bookListRes) {
      ids.push(book.book_list_id);
    }

    for (let row of rows) {
      row.containsBook = ids.includes(row.id);
    }

    res.json(rows);

    // const bookListContains = bookListRes[0].numBooks !== 0;
    // res.json({ contains: bookListContains });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
