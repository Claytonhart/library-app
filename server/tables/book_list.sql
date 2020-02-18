CREATE TABLE book_list (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    book_list_name VARCHAR(100) NOT NULL,
    user_id INT,
    FOREIGN KEY(user_id) REFERENCES user(id),
    created_at TIMESTAMP DEFAULT NOW()
);