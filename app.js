// const inquirer = require("inquirer");
// const mysql = require("mysql");

// const connection = mysql.createConnection({
//   host: "localhost",
//   port: 3306,
//   user: "root",
//   password: "password",
//   database: "employee_trackerDB",
// });

// connection.connect(function (err) {
//   if (err) throw err;
//   console.log("connected as id " + connection.threadId);
//   mainMenu();
// });

const mysql = require('mysql');
const util = require('util');
const inquirer = require('inquirer');
let config;
if (process.env.JAWSDB_URL) {
  config = process.env.JAWSDB_URL;
} else {
  config = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employee_trackerDB',
  }
}
function makeDb(config) {
  const connection = mysql.createConnection(config);
  return {
    query(sql, args) {
      return util.promisify(connection.query)
        .call(connection, sql, args);
    },
    close() {
      return util.promisify(connection.end).call(connection);
    }
  };
}
const db = makeDb(config);

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
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });
};

const viewAllDepartments = () => {
  const query = "SELECT * FROM dept_table;";
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });
};

const viewAllRoles = () => {
  const query = "SELECT * FROM role_table;";
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });
};

const addNewEmployee = async () => {
  const query = 'SELECT * FROM employee_table';
  const query2 = 'SELECT * FROM role_table';
  let data;
  let data2;
  try {
    data = await db.query(query);
    data2 = await db.query(query2);
    console.log(data, data2);
  } catch (error) {
    console.log(error);
  }
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
            return data2.map((role) => role.title);
          },
        },
        {
          name: "manager",
          type: "rawlist",
          message: "Select manager of new employee:",
          choices: function () {
            return data.map((manager) => manager.manager_id);
          },
        },
      ])
      .then(async (answer) => {
        const query = `
              INSERT INTO employee_table (first_name, last_name, role_id, manager_id)
              VALUES (?, ?, ?, ?)`;
        db.query(
          query,
          [answer.firstName, answer.lastName, answer.role, answer.manager],
          (err) => {
            if (err) throw err;
            console.log(
              `${answer.firstName} ${answer.lastName} has been successfully added to the employee list!`
            );
            mainMenu();
          }
        );
      });
};

const addNewDepartment = () => {
  inquirer
    .prompt({
      name: "dept",
      type: "input",
      message: "Enter name of new department:",
    })
    .then(async (answer) => {
      try {
        const query = `INSERT INTO dept_table (dept_name) VALUES (?);`;
        const data = await db.query(query, answer.dept)
        console.log(
          `${answer.dept} has been successfully added to the department list!`
        );
        mainMenu();
      } catch (error) {
        console.log(error);
      }
      });
};

// const addNewRole = () => {
//     db.query("SELECT * FROM dept_table;", (err, res) => {
//         if (err) throw err;
//         inquirer.prompt([
//             {
//                 name: "roleName",
//                 type: "input",
//                 message: "Enter name of new role:"
//             },
//             {
//                 name: "roleSalary",
//                 type: "input",
//                 message: "Enter salary of new role:",
//                 validate: function(value) {
//                     if(isNaN(value) === false) {
//                         return true;
//                     }
//                     return false;
//                 }
//             },
//             {
//                 name: "roleDept",
//                 type: "rawlist",
//                 message: "Select department of new role:",
//                 choices: function () {
//                     return dept_table.map(() => res.dept_name);
//                     // const choicesArray = [];
//                     // for(let i = 0; i < dept_table.length; i++) {
//                     //     choicesArray.push(dept_table[i].dept_name)
//                     // }
//                     // return choicesArray;
//             }
//         ]).then(answer => {
//             const query =
//             `INSERT INTO role_table (title, salary, dept_id)
//             VALUES (?, ?, ?)`;
//             db.query(
//                 query,
//                 [answer.roleName, answer.roleSalary, answer.roleDept],
//                 (err) => {
//                   if (err) throw err;
//                   console.log(
//                     `${answer.roleName} has been successfully added to the role list!`
//                   );
//                   mainMenu();
//           }
//         );
//       });
//   });
// };

const updateEmployeeRole = () => {
  db.query("SELECT * FROM employee_table;", (err, res) => {
    if (err) throw err;
    inquirer
      .prompt({
        name: "employee",
        type: "rawlist",
        message: "Select employee to update role for:",
        choices: function () {
          return employee_table.map(() => res.first_name + res.last_name);
          // const choicesArray = [];
          // for(let i = 0; i < role_table.length; i++) {
          //     choicesArray.push(role_table[i].manager_id)
          // }
          // return choicesArray;
        },
      })
      .then((answer1) => {
        connection
          .query("SELECT * FROM role_table;", (err, res) => {
            if (err) throw err;
            inquirer.prompt({
              name: "role",
              type: "rawlist",
              message: "Select role of new employee:",
              choices: function () {
                return role_table.map(() => res.title);
                // const choicesArray = [];
                // for(let i  = 0; i < role_table.length; i++) {
                //     choicesArray.push(role_table[i].title)
                // }
                // return choicesArray;
              },
            });
          })
          .then((answer2) => {
            const query = `
                UPDATE employee_table
                SET role_id = ?
                WHERE employee_id = ?;`;
            db.query(query, [answer2.role, answer1.employee], (err) => {
              if (err) throw err;
              console.log(
                `${answer1.employee} successfully updated their role to ${answer2.role}!`
              );
              mainMenu();
            });
          });
      });
  });
};

mainMenu();
