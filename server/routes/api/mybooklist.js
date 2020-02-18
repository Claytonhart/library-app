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
  const { name } = req.body;

  try {
    const q = {
      book_list_name: name,
      user_id: req.user.id
    };

    const createBookListRes = await db.query(`INSERT INTO book_list SET ?`, q);
    const bookListId = createBookListRes.insertId;
    console.log(createBookListRes);
    console.log(bookListId);

    // returns empty array if no id
    res.json(bookListId);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/mybooklist/:booklistId
// @desc    add a book_list_book to a booklist,
//          add to book table if it doesn't exist already
// @access  Private
router.post('/:booklistId', auth, async (req, res) => {
  try {
    const { google_id, title, description, image } = req.body;

    const bookInfo = {
      id: google_id,
      title: title,
      description: description,
      thumbnail: image
    };
    // Insert into book table, or update existing record if already exists.
    await db.query(`INSERT IGNORE INTO book SET ?`, bookInfo);

    const q = {
      book_list_id: req.params.booklistId,
      book_id: google_id,
      user_id: req.user.id
    };

    await db.query(`INSERT INTO book_list_book SET ?`, q);

    res.json(req.params.booklistId);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   Delete api/mybooklist/:booklistId/:bookId
// @desc    remove a book_list_book from a booklist
// @access  Private
router.delete('/:booklistId/:bookId', auth, async (req, res) => {
  try {
    const { booklistId, bookId } = req.params;

    // remove book_list_book from booklist if it exists
    await db.query(
      `DELETE FROM book_list_book WHERE book_list_id=? AND book_id=?`,
      [booklistId, bookId]
    );

    res.status(204).send();
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
    const { bookId } = req.params;
    const q = {
      user_id: req.user.id
    };

    const rows = await db.query(
      `SELECT id, book_list_name, created_at FROM book_list WHERE ?`,
      q
    );

    let bookListRes = await db.query(
      `SELECT book_list_id FROM book_list_book JOIN book ON book_list_book.book_id=book.id WHERE book.id=? AND book_list_book.user_id=?`,
      [bookId, req.user.id]
    );

    // let ids = [];
    let ids = {};
    for (let book of bookListRes) {
      // ids.push(book.book_list_id);
      ids[book.book_list_id] = true;
    }

    for (let row of rows) {
      // row.containsBook = ids.includes(row.id);
      row.containsBook = !!ids[row.id];
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
