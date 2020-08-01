//declaring npm packages
const inquirer = require("inquirer");
const mysql= require("mysql");
const consoleTable = require("console.table");

//creating db connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rootarpita1",
    database: "employee_tracker_db"
});

connection.connect(err => {
    if (err) throw err;
    console.log(`connected on thread ${connection.threadId}`);
    
});

