DROP DATABASE IF EXISTS employeeTracker_db
CREATE DATABASE employeeTracker_db
USE employeeTracker_db

CREATE TABLE dept_table (
    id INTEGER NOT NULL,
    dept_name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role_table (
    id INTEGER NOT NULL,
    title VARCHAR(30),
    -- decimal takes two parameters: digits and decimal places
    salary DECIMAL(10, 2),
    dept_id INTEGER NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee_table (
    id INTEGER NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    PRIMARY KEY (id)
);

