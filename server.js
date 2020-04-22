const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_trackerDB"
  });

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    mainMenu();
  });


// inquirer prompts

const mainMenu = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "mainMenuTask",
            message: "Please select from the following:",
            choices: [
                "View all employees",
                "View all departments",
                "View all roles",
                "Add a new employee",
                "Add a new department",
                "Add a new role",
                "Update an employee's role",
                "Exit"
            ]
        }
    ]).then(answer => {
        switch(answer.mainMenuTask) {
            case "View all employees":
                viewAllEmployees();
                break;
            case "View all departments":
                viewAllDepartments();
                break;
            case "View all roles":
                viewAllRoles();
                break;
            case "Add a new employee":
                addNewEmployee();
                break;
            case "Add a new department":
                addNewDepartment();
                break;
            case "Add a new role":
                addNewRole();
                break;
            case "Update an employee's role":
                updateEmployeeRole();
                break;
            case "Exit":
                connection.end();
                break;
            default:
                connection.end();
        }
    })
}

const viewAllEmployees = () => {
    const query = "SELECT * FROM employee_table;";
    connection.query(query, (err, res) => {
        if(err) throw err;
        console.table(res);
        mainMenu();
    });
};

const viewAllDepartments = () => {
    const query = "SELECT * FROM dept_table;";
    connection.query(query, (err, res) => {
        if(err) throw err;
        console.table(res);
        mainMenu();
    });
};

const viewAllRoles = () => {
    const query = "SELECT * FROM role_table;";
    connection.query(query, (err, res) => {
        if(err) throw err;
        console.table(res);
        mainMenu();
    });
};

// addNewEmployee();
// addNewDepartment();
// addNewRole()
// updateEmployeeRole();