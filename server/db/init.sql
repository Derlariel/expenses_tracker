CREATE DATABASE expenses_tracker;
USE expenses_tracker;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE
);

CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS expenses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NULL,
  category_id INT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  description VARCHAR(255),
  expense_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

INSERT INTO categories (name) VALUES
  ('Food'), ('Travel'), ('Entertainment'), ('Bills'), ('Shopping'), ('Health'), ('Other')
ON DUPLICATE KEY UPDATE name=VALUES(name);

select * from expenses;

ALTER TABLE expenses
ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

INSERT INTO expenses (user_id, category_id, amount, description, expense_date)
VALUES
  (NULL, 1, 500, 'Lunch', '2025-07-03'),
  (NULL, 2, 1200, 'Taxi', '2025-07-05'),
  (NULL, 3, 800, 'Movie', '2025-07-10'),
  (NULL, 4, 1500, 'Electric Bill', '2025-07-15'),
  (NULL, 5, 2200, 'New Shoes', '2025-08-02'),
  (NULL, 6, 950, 'Hospital', '2025-08-08'),
  (NULL, 1, 400, 'Dinner', '2025-08-12'),
  (NULL, 7, 600, 'Misc', '2025-08-20'),
  (NULL, 2, 3000, 'Plane Ticket', '2025-09-01'),
  (NULL, 3, 700, 'Concert', '2025-09-07'),
  (NULL, 4, 1800, 'Water Bill', '2025-09-10'),
  (NULL, 6, 1300, 'Medicine', '2025-09-14');

