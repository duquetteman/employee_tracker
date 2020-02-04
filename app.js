const mysql = require('mysql');
const inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "dbpassword",
  database: "employee_managerDB"
});

connection.connect(function (err) {
  if (err) throw err;
  init();
});

function init() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View Departments",
        "View Roles",
        "View All Employees",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Update Employee Role",
        "Exit"
      ]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View Departments":
          viewDepartments();
          break;

        case "View Roles":
          viewRoles();
          break;

        case "View All Employees":
          viewEmployees();
          break;

        case "Add Department":
          addDepartment();
          break;

        case "Add Role":
          addRole();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Update Employee Role":
          updateEmployeeRole();
          break;

        case "Exit":
          connection.end();
          break;
      }
    });

}


//View all:
function viewDepartments() {
    var query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
      if (err) throw err;
      console.table(res);
      console.log("");
      init();
    });
  }


//Add new:
function addEmployee() {

    let join = "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee RIGHT JOIN role ON employee.role_id = role.id";

    connection.query(join, function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "firstName",
                    type: "input",
                    message: "What is their first name?",
                },
                {
                    name: "lastName",
                    type: "input",
                    message: "What is their last name?"
                },
                {
                    name: "role",
                    type: "list",
                    message: "What is their role?",
                    choices: function () {
                        let choiceArray = [];
                        for (let i = 0; i < res.length; i++) {
                            choiceArray.push(res[i].title);
                        }
                        return choiceArray;
                    }
                },
                {
                    name: "manager",
                    type: "list",
                    message: "Who is their manager?",
                    choices: function () {
                        let choiceArray = [];
                        for (let i = 0; i < res.length; i++) {
                            choiceArray.push(`${res[i].first_name} ${res[i].last_name}`);
                        }
                        return choiceArray;
                    }
                }
            ])
            .then(function (answer) {
                connnection.query("")
            });
    });
}

//Add a department:
function addDepartment() {
    inquirer.prompt({
        name: "department",
        type: "input",
        message: "What department would you like to add?"
    })
        .then(function (answer) {
            connection.query("INSERT INTO department SET ?", { name: answer.department }, function (err) {
                if (err) throw err;
                console.log(`${answer.department} department was successfully updated. \n`);
                start();
            });
        });
}

//Add a role:
function addRole() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "role",
                    type: "input",
                    message: "What role would you like to add?"
                },
                {
                    name: "salary",
                    type: "input",
                    message: "What salary does this role make?"
                },
                {
                    name: "roleDep",
                    type: "list",
                    message: "What department does this role fall under?",
                    choices: function () {
                        let choiceArray = [];
                        for (let i = 0; i < res.length; i++) {
                            choiceArray.push(res[i].name);
                        }
                        return choiceArray;
                    }
                }
            ])
            .then(function (answer) {

            });
    });
}


function updateEmployeeRole() {
    //let array = [];
    var query = "SELECT employee.employee_id as value, " +
      "CONCAT(employee.first_name, ' ', employee.last_name) as name FROM employee WHERE manager_id IS NOT NULL";
    connection.query(query, function (err, res) {
      if (err) throw err;
      let array = JSON.parse(JSON.stringify(res));
      inquirer
        .prompt({
          name: "employee",
          type: "list",
          message: "Which employee\"s role do you want to change?",
          choices: array
        }).then(function (answer1) {
          var query = "SELECT role_id as value, role_title as name FROM role WHERE manager = 0";
          connection.query(query, function (err, res) {
            if (err) throw err;
            let array2 = JSON.parse(JSON.stringify(res));
            inquirer
              .prompt({
                name: "role",
                type: "list",
                message: "Which is the new role?",
                choices: array2
              }).then(function (answer2) {
                connection.query("UPDATE employee SET role_id = ? WHERE employee_id = ?",
                  [answer2.role, answer1.employee], function (err, res) {
                    if (err) {
                      if (err.errno === 1451){
                        console.log("You cannot delete this record because of foreign key constrait!");
                      }else{
                        console.log("An error occured!");
                      }
                      return init();
                    }
                    if (res.affectedRows > 0) {
                      console.log(res.affectedRows + " record updated successfully!");
                    }
                    console.log("");
                    init();
                  });
              });
          });
        });
    });
  }
  
  function updateEmployeeManager() {
    //let array = [];
    var query = "SELECT employee.employee_id as value, " +
      "CONCAT(employee.first_name, ' ', employee.last_name) as name FROM employee WHERE manager_id IS NOT NULL";
    connection.query(query, function (err, res) {
      if (err) throw err;
      let array = JSON.parse(JSON.stringify(res));
      inquirer
        .prompt({
          name: "employee",
          type: "list",
          message: "Which employee\"s manager do you want to change?",
          choices: array
        }).then(function (answer1) {
          var query = "SELECT employee.employee_id as value, CONCAT(employee.first_name, ' ', employee.last_name) as name" +
            "FROM employee INNER JOIN role ON employee.role_id = role.role_id WHERE role.manager = 1";
          connection.query(query, function (err, res) {
            if (err) throw err;
            let array2 = JSON.parse(JSON.stringify(res));
            inquirer
              .prompt({
                name: "role",
                type: "list",
                message: "Who is the new manager?",
                choices: array2
              }).then(function (answer2) {
                connection.query("UPDATE employee SET manager_id = ? WHERE employee_id = ?",
                  [answer2.role, answer1.employee], function (err, res) {
                    if (err) {
                      if (err.errno === 1451){
                        console.log("You cannot delete this record because of foreign key constrait!");
                      }else{
                        console.log("An error occured!");
                      }
                      return init();
                    }
                    if (res.affectedRows > 0) {
                      console.log(res.affectedRows + " record updated successfully!");
                    }
                    console.log("");
                    init();
                  });
              });
          });
        });
    });
  }

//Delete employee
function deleteEmployee() {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        inquirer.prompt({
            name: "employee",
            type: "list",
            message: "What employee would you like to delete?",
            choices: function () {
                let choiceArray = [];
                for (let i = 0; i < res.length; i++) {
                    choiceArray.push(res[i].last_name);
                }
                return choiceArray;
            }
        })
            .then(function (answer) {
                connection.query("DELETE FROM employee WHERE ?", { last_name: answer.employee }, function (err) {
                    if (err) throw err;
                    console.log(`${answer.employee} was successfully deleted. \n`);
                    start();
                });
            });
    });
}

//Exit
function exit() {
    connection.end();
}