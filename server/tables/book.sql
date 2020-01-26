CREATE TABLE book (
    id INT AUTO_INCREMENT PRIMARY KEY,
    google_id VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    isbn10 INT,
    isbn13 INT,
    thumbnail VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
);