//declaring npm packages
const inquirer = require("inquirer");
const mysql = require("mysql");
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
    console.log(`connected as id ${connection.threadId}`);
    renderAction();
});

//creating an array of list of actions can be performed
const actions = ["Add Departments", "Add Roles", "Add Employees", "View Departments", "View Roles", "View Employees", "Update Employee Roles", "Update Employee Managers", "View Employees By Manager", "View Budget of a Department", "Delete Department", "Delete Role", "Delete Employee", "Exit"];

//This funtion will render the action list to select
function renderAction() {
    inquirer.prompt([
        {
            name: "action",
            massage: "Select Action",
            type: "list",
            choices: actions
        }
    ]).then(answer => {
        switch (answer.action) {
            case "Add Departments":
                addDepartments();
                break;
            case "Add Roles":
                addRoles();
                break;
            case "Add Employees":
                addEmp();
                break;
            case "View Departments":
                viewDep();
                break;
            case "View Roles":
                viewRoles();
                break;
            case "View Employees":
                viewEmp();
                break;
            case "View Employees By Manager":
                viewEmpByManager();
                break;
            case "View Budget of a Department":
                viewBudgets();
                break;
            case "Update Employee Roles":
                updateEmpRoles();
                break;
            case "Update Employee Manager":
                updateEmpManager();
                break;
            case "Delete Departments":
                deleteDep();
                break;
            case "Delete Roles":
                deleteRoles();
                break;
            case "Delete Employees":
                deleteEmp();
                break;
            case "Exit":
            default:
                connection.end();
                process.exit();

        }
    });
}

function addDepartments(){

};
function addRoles(){

};
function addEmp(){

};
function viewDep(){

};
function viewRoles(){

};
function viewEmp(){

};
function viewEmpByManager(){

};
function viewBudgets(){

};
function updateEmpRoles(){

};
function updateEmpManager(){

};
function deleteDep(){

};

function deleteRoles(){

};

function deleteEmp(){

};







