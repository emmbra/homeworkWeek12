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

const mysql = require("mysql");
const util = require("util");
const inquirer = require("inquirer");
let config;
if (process.env.JAWSDB_URL) {
  config = process.env.JAWSDB_URL;
} else {
  config = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_trackerDB",
  };
}
function makeDb(config) {
  const connection = mysql.createConnection(config);
  return {
    query(sql, args) {
      return util.promisify(connection.query).call(connection, sql, args);
    },
    close() {
      return util.promisify(connection.end).call(connection);
    },
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
  const employeeQuery = "SELECT * FROM employee_table";
  const roleQuery = "SELECT * FROM role_table";
  let employeeData;
  let roleData;
  try {
    employeeData = await db.query(employeeQuery);
    roleData = await db.query(roleQuery);
    console.log(employeeData, roleData);
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
          return roleData.map((role) => role.title);
        },
      },
      {
        name: "manager",
        type: "rawlist",
        message: "Select manager of new employee:",
        choices: function () {
          return employeeData.map((manager) => manager.manager_id);
        },
      },
    ])
    .then(async (answer) => {
      try {
        const query = `
        INSERT INTO employee_table (first_name, last_name, role_id, manager_id)
        VALUES (?, ?, ?, ?)`;
        await db.query(
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
      } catch (error) {
        console.log(error);
      }
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
        const deptQuery = `INSERT INTO dept_table (dept_name) VALUES (?);`;
        const deptData = await db.query(deptQuery, answer.dept);
        console.log(
          `${answer.dept} has been successfully added to the department list!`
        );
        mainMenu();
      } catch (error) {
        console.log(error);
      }
    });
};

const addNewRole = async () => {
  const deptQuery = "SELECT * FROM dept_table";
  let deptData;
  try {
    deptData = await db.query(deptQuery);
  } catch (error) {
    console.log(error);
  }
  inquirer
    .prompt([
      {
        name: "roleName",
        type: "input",
        message: "Enter name of new role:",
      },
      {
        name: "roleSalary",
        type: "input",
        message: "Enter salary of new role:",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        },
      },
      {
        name: "roleDept",
        type: "rawlist",
        message: "Select department of new role:",
        choices: function () {
          return deptData.map(
            (roleDept) => roleDept.dept_name + " " + roleDept.id
          );
        },
      },
    ])
    .then(async (answer) => {
      try {
        const query = `INSERT INTO role_table (title, salary, dept_id)
      VALUES (?, ?, ?)`;
        db.query(
          query,
          [answer.roleName, answer.roleSalary, answer.roleDept.id],
          (err) => {
            if (err) throw err;
            console.log(
              `${answer.roleName} has been successfully added to the role list!`
            );
            mainMenu();
          }
        );
      } catch (error) {
        console.log(error);
      }
    });
};

const updateEmployeeRole = async () => {
  const employeeQuery = "SELECT * FROM employee_table";
  const roleQuery = "SELECT * FROM role_table";
  let employeeData;
  let roleData;
  try {
    employeeData = await db.query(employeeQuery);
    roleData = await db.query(roleQuery);
  } catch (error) {
    console.log(error);
  }
  inquirer
    .prompt([
      {
        name: "employee",
        type: "rawlist",
        message: "Select employee to update role for:",
        choices: function () {
          return employeeData.map(
            (employee) =>
              employee.first_name + " " + employee.last_name + " " + employee.id
          );
        },
      },
      {
        name: "role",
        type: "rawlist",
        message: "Select role of new employee:",
        choices: function () {
          return roleData.map((role) => role.title + " " + role.id);
        },
      },
    ])
    .then(async (answer) => {
      try {
        const query = `UPDATE employee_table SET role_id = ? WHERE employee_id = ?;`;
        await db.query(query, [answer.id, answer.id], (err) => {
          if (err) throw err;
          console.log(
            `${answer.employee} successfully updated their role to ${answer.role}!`
          );
          mainMenu();
        });
      } catch (error) {
        console.log(error);
      }
    });
};

mainMenu();
