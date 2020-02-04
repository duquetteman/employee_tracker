

INSERT INTO employee_managerDB.department (department_id, name)
VALUES (1, "Accounting");

INSERT INTO employee_managerDB.department (department_id, name)
VALUES (2, "Legal");

INSERT INTO employee_managerDB.department (department_id, name)
VALUES (3, "Marketing");

INSERT INTO employee_managerDB.department (department_id, name)
VALUES (4, "Engineering");


INSERT INTO employee_managerDB.role (role_id, role_title, role_salary, department_id, manager)
VALUES (1, "Jr Developer", 40000, 4, 1);

INSERT INTO employee_managerDB.role (role_id, role_title, role_salary, department_id, manager)
VALUES (2, "Senior Developer", 80000, 4, 0);

INSERT INTO employee_managerDB.role (role_id, role_title, role_salary, department_id, manager)
VALUES (3, "Finance Manager", 100000, 1, 1);

INSERT INTO employee_managerDB.role (role_id, role_title, role_salary, department_id, manager)
VALUES (4, "Accountant", 60000, 1, 0);

INSERT INTO employee_managerDB.role (role_id, role_title, role_salary, department_id, manager)
VALUES (7, "Lawyer", 80000, 2, 0);

INSERT INTO employee_managerDB.role (role_id, role_title, role_salary, department_id, manager)
VALUES (8, "Marketing Lead", 85000, 3, 1);

INSERT INTO employee_managerDB.role (role_id, role_title, role_salary, department_id, manager)
VALUES (9, "Marketing Associate", 65000, 3, 0);


INSERT INTO employee_managerDB.employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (1, "Bella", "Christensen", 7, 4);

INSERT INTO employee_managerDB.employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (2, "Jane", "Mccarthy", 1, Null);

INSERT INTO employee_managerDB.employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (3, "Ana", "Gentry", 3, Null);

INSERT INTO employee_managerDB.employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (4, "Beth", "Leone", 4, Null);

INSERT INTO employee_managerDB.employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (5, "Roxanne", "Smith", 3, 7);

INSERT INTO employee_managerDB.employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (6, "Aoife", "Copeland", 2, 2);

INSERT INTO employee_managerDB.employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (7, "Summer", "Bentley", 4, Null);

INSERT INTO employee_managerDB.employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (8, "Arie", "Juliff", 2, 7);

INSERT INTO employee_managerDB.employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (9, "Patricia", "Dickerson", 1, 7);

INSERT INTO employee_managerDB.employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (10, "Isla", "Garrett", 2, 2);

INSERT INTO employee_managerDB.employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (11, "Paul", "Sanders", 2, 3);

INSERT INTO employee_managerDB.employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (12, "Stephanie", "Goetz", 3, 4);

INSERT INTO employee_managerDB.employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (13, "Ella", "Hogan", 4, 7);

INSERT INTO employee_managerDB.employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (14, "Anika", "Chaney", 3, 7);

INSERT INTO employee_managerDB.employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (15, "Tim", "Bailey", 1, 3);




