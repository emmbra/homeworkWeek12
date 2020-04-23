const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employee_trackerDB",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  mainMenu();
});

// inquirer prompts

const mainMenu = () => {
  inquirer
    .prompt([
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
          "Exit",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.mainMenuTask) {
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
    });
};

// functions from mainMenu

const viewAllEmployees = () => {
  const query = "SELECT * FROM employee_table;";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });
};

const viewAllDepartments = () => {
  const query = "SELECT * FROM dept_table;";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });
};

const viewAllRoles = () => {
  const query = "SELECT * FROM role_table;";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });
};

const addNewEmployee = () => {
  connection.query("SELECT * FROM role_table;", (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "firstName",
          type: "input",
          message: "Enter first name of new employee:",
        },
        {
          name: "lastName",
          type: "input",
          message: "Enter last name of new employee:",
        },
        {
          name: "role",
          type: "rawlist",
          message: "Select role of new employee:",
          choices: function () {
            return role_table.map((role) => res.title);
            // const choicesArray = [];
            // for(let i  = 0; i < role_table.length; i++) {
            //     choicesArray.push(role_table[i].title)
            // }
            // return choicesArray;
          }
        },
        {
          name: "manager",
          type: "rawlist",
          message: "Select manager of new employee:",
          choices: function () {
            return role_table.map((role) => res.manager_id);
            // const choicesArray = [];
            // for(let i = 0; i < role_table.length; i++) {
            //     choicesArray.push(role_table[i].manager_id)
            // }
            // return choicesArray;
          }
        }
      ])
      .then((answer) => {
        const query = `
              INSERT INTO employee_table (first_name, last_name, role_id, manager_id)
              VALUES (?, ?, ?, ?)`;
        connection.query(
          query,
          [answer.firstName, answer.lastName, answer.role, answer.manager],
          (err, res) => {
            if (err) throw err;
            console.log(
              `${answer.firstName} ${answer.lastName} has been successfully added to the employee list!`
            );
            mainMenu();
          }
        );
      });
  });
};

const addNewDepartment = () => {
  inquirer
    .prompt({
      name: "dept",
      type: "input",
      message: "Enter name of new department:",
    })
    .then((answer) => {
      const query = `
        INSERT INTO dept_table (id, dept_name)
        VALUES (0, ?);`;
      //should I be passing 0 here?
      connection.query(query, answer.dept, (err, res) => {
        if (err) throw err;
        console.log(
          `${answer.dept} has been successfully added to the department list!`
        );
        mainMenu();
      });
    });
};

const addNewRole = () => {
    connection.query("SELECT * FROM dept_table;", (err, res) => {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "roleName",
                type: "input",
                message: "Enter name of new role:"
            },
            {
                name: "roleSalary",
                type: "input",
                message: "Enter salary of new role:",
                validate: function(value) {
                    if(isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "roleDept",
                type: "rawlist",
                message: "Select department of new role:",
                choices: function () {
                    return role_table.map((role) => res.manager_id);
                    // const choicesArray = [];
                    // for(let i = 0; i < role_table.length; i++) {
                    //     choicesArray.push(role_table[i].manager_id)
                    // }
                    // return choicesArray;
            }
        ]).then(answer => {
            const query =
            `INSERT INTO role_table (title, salary, dept_id)
            VALUES (?, ?, ?)`;
            connection.query(
                query,
                [answer.roleName, answer.roleSalary, answer.roleDept],
                (err, res) => {
                  if (err) throw err;
                  console.log(
                    `${answer.roleName} has been successfully added to the role list!`
                  );
                  mainMenu();
          }
        );
      });
  });
};
    

// updateEmployeeRole();
