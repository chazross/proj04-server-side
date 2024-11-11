-- Use the book_facts database
-- SQLite doesn't require the `USE` command, as it directly connects to the database file

-- Create the categories table
CREATE TABLE IF NOT EXISTS categories (
    category_id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_name TEXT NOT NULL
);

-- Insert sample categories into the categories table
INSERT INTO categories (category_name) VALUES
('Edgar Allan Poe'),
('Odd Book Facts'),
('Sherlock Holmes');

-- Select all categories
SELECT * FROM categories;

-- Example: Delete a specific category
DELETE FROM categories WHERE category_name = 'Edgar Allan Poe';

-- Insert a new category
INSERT INTO categories (category_name) VALUES ('Odd Book Facts');

-- Check if the deleted category still exists
SELECT * FROM categories WHERE category_name = 'Edgar Allan Poe';

-- Delete a category by ID (modify as needed)
DELETE FROM categories WHERE category_id = 3;

-- Check the new category
SELECT * FROM categories WHERE category_name = 'Odd Book Facts';

-- Attempt to insert a category with a specific ID (should typically not be done if auto_increment is used)
INSERT INTO categories (category_name) VALUES ('Odd Book Facts');  -- Do not include category_id since it's auto-incremented

-- Check for the newly inserted category
SELECT * FROM categories WHERE category_name = 'Odd Book Facts';

-- Delete a category by ID
DELETE FROM categories WHERE category_id = 4;

-- Create the questions table
CREATE TABLE IF NOT EXISTS questions (
    question_id INTEGER PRIMARY KEY AUTOINCREMENT,
    question_text TEXT NOT NULL,
    answer TEXT NOT NULL,
    category_id INTEGER,
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE CASCADE
);

-- Insert questions into the questions table for category_id = 1 (Edgar Allan Poe)
INSERT INTO questions (question_text, answer, category_id) VALUES
('What year was Edgar Allen Poe’s “The Raven” first printed?', '1845', 1),
('What story did Poe write that has similarities to Jack the Ripper murders?', 'The Murders in the Rue Morgue', 1),
('How many family members did Poe lose to tuberculosis?', 'Three', 1);

-- Insert questions into the questions table for category_id = 2 (Odd Book Facts)
INSERT INTO questions (question_text, answer, category_id) VALUES
('What poison is found in the late 1800’s books with green cloth binding?', 'Arsenic', 2),
('What makes the scent of old books captivating?', 'Volatile organic compounds released from paper and binding materials', 2),
('What are the books called that show an illustrated design when fanned out?', 'Fan books or panorama books', 2);

-- Insert questions into the questions table for category_id = 3 (Sherlock Holmes)
INSERT INTO questions (question_text, answer, category_id) VALUES
('What was Sherlock Holmes address?', '221B Baker Street', 3),
('What was the first story of Sherlock Holmes called?', 'A Study in Scarlet', 3),
('Who was Sherlock Holmes love interest?', 'Irene Adler', 3);

-- Select all questions
SELECT * FROM questions;

-- Check remaining questions
SELECT * FROM questions;



-- Create the 'users' table with 'uname' as the primary key
CREATE TABLE users (
    uname TEXT PRIMARY KEY,  -- 'uname' is the primary key
    pword TEXT              -- 'pword' can be NULL by default
);

-- Insert two sample users into the table
INSERT INTO users (uname, pword) VALUES ('ChazRoss', 'ChazRoss7');
INSERT INTO users (uname, pword) VALUES ('BobDylan', 'BobDylan7');

-- Select all users from the 'users' table
SELECT * FROM users;

