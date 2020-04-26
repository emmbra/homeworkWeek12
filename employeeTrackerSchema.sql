DROP DATABASE IF EXISTS employee_trackerDB;
CREATE DATABASE employee_trackerDB;
USE employee_trackerDB;

CREATE TABLE dept_table (
    id INTEGER NOT NULL AUTO_INCREMENT,
    dept_name VARCHAR(50),
    PRIMARY KEY (id)
);

CREATE TABLE role_table (
    id INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR(50),
    -- decimal takes two parameters: digits and decimal places
    salary DECIMAL(10, 2),
    dept_id INTEGER NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee_table (
    id INTEGER NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(30),
    role_id INTEGER NOT NULL AUTO_INCREMENT,
    manager_id INTEGER AUTO_INCREMENT,
    PRIMARY KEY (id)
);

-- dept_table seed
INSERT INTO dept_table (id, dept_name)
VALUES (1, "IT"),
(2, "HR"),
(3, "Legal"),
(4, "Finance"),
(5, "Administration");

-- employee_table seed
INSERT INTO employee_table (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Emmett", "Brady", 1, 1),
(2, "Clara", "Rice", 2, 2),
(3, "Musa", "Akbari", 3, 3),
(4, "Sergio", "Di Martino", 4, NULL),
(5, "Manny", "Jucaban", 5, NULL);

-- role_table seed
INSERT INTO role_table (id, title, salary, dept_id)
VALUES (1, "Lawyer", 160000, 3),
(2, "Accountant", 137000, 4),
(3, "Receptionist", 100000, 5),
(4, "Project Manager", 140000, 2),
(5, "Software Engineer", 120000, 1);

-- queries
SELECT * FROM dept_table;
SELECT * FROM role_table;
SELECT * FROM employee_table;
