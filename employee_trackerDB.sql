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
INSERT INTO dept_table (dept_name)
VALUES ("IT"),
("HR"),
("Legal"),
("Finance"),
("Administration");

INSERT INTO role_table (title, salary, dept_id)
VALUES ("Lawyer", 160000, 3),
("Accountant", 137000, 4),
("Receptionist", 100000, 5),
("Project Manager", 140000, 2),
("Software Engineer", 120000, 1);

INSERT INTO employee_table (first_name, last_name)
VALUES ("Emmett", "Brady"),
("Clara", "Rice"),
("Musa", "Akbari"),
("Sergio", "Di Martino"),
("Manny", "Jucaban");


SELECT * FROM dept_table;
SELECT * FROM role_table;
SELECT * FROM employee_table;