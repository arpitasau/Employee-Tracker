-- adding data in department table
INSERT INTO department(name) VALUES("Human Resource");
INSERT INTO department(name) VALUES("Engineering");
INSERT INTO department(name) VALUES("Information Technology");
INSERT INTO department(name) VALUES("Finance");
INSERT INTO department(name) VALUES("Transport");
INSERT INTO department(name) VALUES("Legal");
INSERT INTO department(name) VALUES("Tech Support");
INSERT INTO department(name) VALUES("Marketing");


-- adding data in role table
INSERT INTO role(title, salary, department_id) VALUES("Software Engineer", 160000, 3);
INSERT INTO role(title, salary, department_id) VALUES("Devops Engineer", 140000, 3);
INSERT INTO role(title, salary, department_id) VALUES("Portfolio Manager", 130000, 3);
INSERT INTO role(title, salary, department_id) VALUES("Technical Recruiter", 80000, 1);
INSERT INTO role(title, salary, department_id) VALUES("Senior Analyst", 100000, 2);
INSERT INTO role(title, salary, department_id) VALUES("Project Manager", 140000, 3);
INSERT INTO role(title, salary, department_id) VALUES("Sales Executive", 60000, 8);
INSERT INTO role(title, salary, department_id) VALUES("Senior Paralegal", 90000, 6);

-- adding data in employee table
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("John", "Doe", 6, null);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("Gail", "Smith", 2, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("Cindy", "Jones", 6, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("Jim", "Greenwood", 6, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("Don", "Wilshire", 3, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("Nisha", "Patel", 7, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("Kaity", "George", 7, 1);