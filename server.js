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
    inquirer.prompt([
        {
            type: "input",
            name: "firstname",
            message: "Enter employee's first name:"
            //validate - add validation later
        },
        {
            type: "input",
            name: "lastname",
            message: "Enter employee's last name:"
            //validate - add validation later
        },
        {
            type: "input",
            name: "firstname",
            message: "Enter employee's first name:"
            //validate - add validation later
        },
        {
            type: "input",
            name: "managerfirstname",
            message: "Enter employee's manager's first name:"
            //validate - add validation later
        },
        {
            type: "input",
            name: "managerlastname",
            message: "Enter employee's manager's last name:"
            //validate - add validation later
        },
        {
            type: "list",
            name: "employeerole",
            message: "Select employee's role:"
            choices: [
                "Lawyer",
                "Accountant",
                "Receptionist",
                "Project Manager",
                "Software Engineer"
            ]
        },
        {
            type: "list",
            name: "employeedept",
            message: "Select employee's department:"
            choices: [
                "IT",
                "HR",
                "Legal",
                "Finance",
                "Administration"
            ]
        }
    ]).then answer => {
        const firstName = answer.firstname;
        const lastName = answer.lastname;
        const managerFirstName = answer.managerfirstname;
        const managerLastName = answer.managerlastname;
        let managerID = 1;

        answer.employeerole = "Lawyer" ? role_id = 1 :
        answer.employeerole = "Accountant" ? role_id = 2 :
        answer.employeerole = "Receptionist" ? role_id = 3 :
        answer.employeerole = "Project Manager" ? role_id = 4 :
        answer.employeerole = "Software Engineer" ? role_id = 5

        answer.employeedept = "IT" ? dept_id = 1 :
        answer.employeedept = "HR" ? dept_id = 2 :
        answer.employeedept = "Legal" ? dept_id = 3 :
        answer.employeedept = "Finance" ? dept_id = 4 :
        answer.employeedept = "Administration" ? dept_id = 5

        //need to use sql to insert answers into employee table
        // INSERT INTO employee_table (first_name, last_name, role_id, manager_id)
        // VALUES (firstName, lastName, role_id, managerID)

    }
}
updateEmployeeRole()
viewAllEmployees()