//declaring npm packages
const inquirer = require("inquirer");
const mysql = require("mysql");
const consoleTable = require("console.table");

console.log("Welcome to Employee Tracker Application");

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
    //console.log(`connected as id ${connection.threadId}`);
    renderAction();
});

//creating an array of list of actions can be performed
const actions = ["Add Departments", "Add Roles", "Add Employees", "View Departments", "View Roles", "View Employees", "Update Employee Roles", "Delete Department", "Delete Role", "Delete Employee", "Exit"];

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
                addDept();
                break;
            case "Add Roles":
                addRoles();
                break;
            case "Add Employees":
                addEmp();
                break;
            case "View Departments":
                viewDept();
                break;
            case "View Roles":
                viewRoles();
                break;
            case "View Employees":
                viewEmp();
                break;
            case "Update Employee Roles":
                updateEmpRoles();
                break;
            case "Delete Departments":
                deleteDept();
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
//This funtion is to validate that user added something for add/update function
function validateInput(input){
    if(input === ''){
        return "Please add text to this field"
    }
    return true
};

// to add new department in department table
function addDept(){
    inquirer.prompt([
        {
            name: "dept",
            massage: "Enter Department Name:",
            type: "input",
            validate : validateInput
    }
]).then(answer => {
    connection.query("INSERT INTO department (name) VALUES (?)",
    answer.dept,
    function(err){
        if (err)throw err;
        renderAction();
    });
})
}

//to add roles in role table
function addRoles(){
    inquirer.prompt([
        {
            name: "title",
            massage: "Enter Job Title:",
            type: "input",
            validate : validateInput
    },
    {
        name: "salary",
            massage: "Enter Salary:",
            type: "input",
            validate : validateInput

    },
    {
    name: "department_id",
            massage: "Enter department ID:",
            type: "input",
            validate : validateInput
    }

]).then(answer => {
    connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
    [answer.title, answer.salary, answer.department_id,],
    function(err){
        if (err)throw err;
        renderAction();
    });
})
}

// to add employee in employee table
function addEmp(){
    connection.query(
        `SELECT r.title Title, r.salary Salary, d.name Department, r.id RoleID
         FROM role r
         LEFT JOIN department d ON (d.id = r.department_id)
         ORDER BY r.title,d.name`,
    function(err, results) {
        let roleOption = ["No Role"];
        if (err) throw err;
        results.forEach(element => {
            roleOption.push(`${element.Title} - ${element.Salary} - ${element.Department} - ${element.RoleID}`);
        });
        connection.query(
            `SELECT e.first_name FirstName,e.last_name LastName,d.name Department,r.title Title,e.id EmployeeID,concat(m.first_name," ",m.last_name) Manager
             from employee e
             LEFT JOIN role r ON (e.role_id = r.id)
             LEFT JOIN department d ON (r.department_id = d.id)
             LEFT JOIN employee m ON (e.manager_id = m.id)
             ORDER BY e.first_name,e.last_name,d.name,r.title`,
        function(err2,results2) {
            let managerArr = ["No Manager"];
            if (err2) throw err2;
            results2.forEach(element => {
                managerArr.push(`${element.FirstName} ${element.LastName} - ${element.Title} - ${element.Department} - ${element.EmployeeID}`);
            });
            inquirer.prompt([
                {
                    name: "first_name",
                    type: "input",
                    message: "Enter first name:",
                    validate: validateInput
                },
                {
                    name: "last_name",
                    type: "input",
                    message: "Enter last name:",
                    validate: validateInput
                },
                {
                    name: "role_id",
                    type: "list",
                    message: "Choose role (Title - Salary - Department - RoleID):",
                    choices: roleOption
                },
                {
                    name: "manager_id",
                    type: "list",
                    message: "Choose manager (Name - Title - Department - EmployeeID):",
                    choices: managerArr
                }
            ]).then(answers => {
                let roleId = (answers.role_id === "No Role" ) ? null : parseInt(answers.role_id.split(' - ').pop());
                let managerId = (answers.manager_id === "No Manager" ) ? null : parseInt(answers.manager_id.split(' - ').pop());
                connection.query("insert into employee (first_name,last_name,role_id,manager_id) values (?,?,?,?)",
                [answers.first_name,answers.last_name,roleId,managerId],
                function(err) {
                    if (err) throw err;
                    renderAction();
                }
                );
            });
        });
    });
}

// this function returns all the departments from department table
function viewDept(){
    connection.query(`SELECT name, id FROM department;`, (err, results)=>{
        if(err)throw err;
        console.table(results);
        renderAction()
    })
}

// this function returns all the roles from role table
function viewRoles(){
    connection.query(`SELECT * FROM role;`,(err, results)=>{
        if(err)throw err;
        console.table(results);
        renderAction()
    })
}

//this function returns all the employee from employee table
function viewEmp(){
    connection.query(`
    SELECT e.first_name FirstName, e.last_name LastName, d.name Department, r.title JobTitle, r.salary Salary, e.id EmpID, e.manager_id Manager
             FROM employee e
             LEFT JOIN role r on (e.role_id = r.id)
             LEFT JOIN department d on (r.department_id = d.id)
             LEFT JOIN employee m on (e.manager_id = m.id)
             ORDER BY e.first_name,e.last_name,d.name,r.title;`,(err, results)=>{
        if(err)throw err;
        console.table(results);
        renderAction()
    })
}

//this function update roles
function updateEmpRoles(){
    connection.query(
        `SELECT e.first_name FirstName,e.last_name LastName,d.name Department,r.title Title, 
         r.salary Salary,concat(m.first_name," ",m.last_name) Manager,e.id EmployeeID
         FROM employee e
         LEFT JOIN role r ON (e.role_id = r.id)
         LEFT JOIN department d ON (r.department_id = d.id)
         LEFT JOIN employee m ON (e.manager_id = m.id)
         ORDER BY e.first_name,e.last_name,d.name,r.title`,
    function(err, results) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "employee_id",
                type: "list",
                message: "Choose employee to update (Name - Department - Title - Salary - Manager - EmployeeID):",
                choices: function () {
                    var options = [];
                    results.forEach(element => {
                        options.push(`${element.FirstName} ${element.LastName} - ${element.Department} - ${element.Title} - ${element.Salary} - ${element.Manager} - ${element.EmployeeID}`);
                    });
                    return options;
                }
            }
        ]).then(function(answer) {
            connection.query(
                `SELECT r.title Title, r.salary Salary, d.name Department,r.id RoleID
                 FROM role r
                 LEFT JOIN department d ON (d.id = r.department_id)
                 ORDER BY r.title,d.name`,
            function(err2, results2) {
                if (err2) throw err2;
                inquirer.prompt([
                    {
                        name: "role_id",
                        type: "list",
                        message: "Choose role to delete (Title - Salary - Department - RoleID):",
                        choices: function () {
                            var options2 = ["No Role"];
                            results2.forEach(element => {
                                options2.push(`${element.Title} - ${element.Salary} - ${element.Department} - ${element.RoleID}`);
                            });
                            return options2;
                        }
                    }
                ]).then(function(answer2) {
                    let empId = parseInt(answer.employee_id.split(' - ').pop());
                    // let roleId = parseInt(answer2.role_id.split(' - ').pop());
                    let roleId = (answer2.role_id === "No Role" ) ? null : parseInt(answer2.role_id.split(' - ').pop());
                    connection.query(`update employee set role_id = ${roleId} where id = ${empId}`,
                    function(err3, results3) {
                        if (err3) throw err3;
                        renderAction();
                    });
                });
            });
        });
    });
}

function deleteDept(){
        connection.query("SELECT * FROM department ORDER BY name",
        function(err, results) {
            if (err) throw err;
            inquirer.prompt([
                {
                    name: "choice",
                    type: "list",
                    message: "Choose department to delete (Department Name - Dept ID):",
                    choices: function () {
                        var options = [];
                        results.forEach(element => {
                            options.push(`${element.name} - ${element.id}`);
                        });
                        return options;
                    }
                }
            ]).then(function(answer) {
                connection.query("DELETE FROM department WHERE concat(name,' - ',id) = ?",
                answer.choice,
                function(err2, results2) {
                    if (err2) throw err2;
                    renderAction();
                });
            });
        });
    }
    

function deleteRoles(){
    connection.query(
        `SELECT r.title Title, r.salary Salary,d.name Department,r.id RoleID
         FROM role r
         LEFT JOIN department d ON (d.id = r.department_id)
         ORDER BY r.title,d.name`,
    function(err, results) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "role_id",
                type: "list",
                message: "Choose role to delete (Title - Salary - Department - RoleID):",
                choices: function () {
                    var options = [];
                    results.forEach(element => {
                        options.push(`${element.Title} - ${element.Salary} - ${element.Department} - ${element.RoleID}`);
                    });
                    return options;
                }
            }
        ]).then(function(answer) {
            let roleId = answer.role_id.split(' - ').pop();
            connection.query("delete from role where id = ?",
            roleId,
            function(err2, results2) {
                if (err2) throw err2;
                renderAction();
            });
        });
    });
}







