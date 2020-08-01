-- Drops the employee-tracker_db if it already exists --
DROP DATABASE IF EXISTS employee_tracker_db;
-- Create the database employee_tracker_db and specified it for use.
CREATE DATABASE employee_tracker_db;
USE employee_tracker_db;
-- Create the table plans.
CREATE TABLE department (
  id INTEGER(15) NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INTEGER(15) NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INTEGER(15) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES department(id)
);


CREATE TABLE employee (
  id INTEGER(15) NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER(15),
  manager_id INTEGER(15),
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES role(id) on delete cascade,
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);

