const mysql = require('mysql');
const inquirer = require('inquirer');

let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Patchduq1',
    database: 'employee_trackerDB'
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});
