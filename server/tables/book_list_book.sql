CREATE TABLE book_list_book (
    id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    book_list_id INT,
    book_id INT,
    user_id INT,
    FOREIGN KEY(book_list_id) REFERENCES book_list(id),
    FOREIGN KEY(book_id) REFERENCES book(id),
    FOREIGN KEY(user_id) REFERENCES user(id),
    created_at TIMESTAMP DEFAULT NOW()
);