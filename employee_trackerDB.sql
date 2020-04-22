DROP DATABASE IF EXISTS employee_trackerDB;
CREATE DATABASE employee_trackerDB;
USE employee_trackerDB;

CREATE TABLE dept_table (
    id INTEGER NOT NULL AUTO_INCREMENT,
    dept_name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role_table (
    id INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    -- decimal takes two parameters: digits and decimal places
    salary DECIMAL(10, 2),
    dept_id INTEGER NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee_table (
    id INTEGER NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    PRIMARY KEY (id)
);

-- seed data
INSERT INTO dept_table (id, dept_name)
VALUES (1, "IT"),
(2, "HR"),
(3, "Legal"),
(4, "Finance"),
(5, "Administration");

INSERT INTO role_table (id, title, salary, dept_id)
VALUES (1, "Lawyer", 160000, 3),
(2, "Accountant", 137000, 4),
(3, "Receptionist", 100000, 5),
(4, "Project Manager", 140000, 2),
(5, "Software Engineer", 120000, 1);

INSERT INTO employee_table (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Emmett", "Brady", 1, 1),
(2, "Clara", "Rice", 2, 2),
(3, "Musa", "Akbari", 3, 3),
(4, "Sergio", "Di Martino", 4, NULL),
(5, "Manny", "Jucaban", 5, NULL);


SELECT * FROM dept_table;
SELECT * FROM role_table;
SELECT * FROM employee_table;