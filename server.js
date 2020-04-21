const inquirer = require("inquirer");

const mainMenu = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "mainMenuTask",
            message: "Please select from the following:",
            choices: [
                "Add a new employee",
                "Update an employee's role",
                "View all employees",
                "Exit"
            ]
        }
    ]).then(answer => {
        answer.mainMenuTask = "Add a new employee" ? addNewEmployee() :
        answer.mainMenuTask = "Update an employee's role" ? updateEmployeeRole() :
        answer.mainMenuTask = "View all employees" ? viewAllEmployees() :
        answer.mainMenuTask = "Exit" ? //end sql connection
    })
}

const addNewEmployee = () => {
}
updateEmployeeRole()
viewAllEmployees()