// Imports
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// Employees array where the generated manager, engineer and intern is stored
const employees = [];

// Function to generate the HTML page and save it
function generateAndSaveHTML() {
  const htmlContent = render(employees); // Use the render function with the employees array
  // Create the output directory if it doesn't exist
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }
  // Write the HTML content to the team.html file
  fs.writeFile(outputPath, htmlContent, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Team HTML page saved to ${outputPath}`);
    }
  });
}

// TODO: Write Code to gather information about the development team members, and render the HTML file.
// Manager input function
function addManager() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the manager's name:",
        validate: (input) => {
          if (input.trim() === "") {
            return "Name cannot be empty.";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "id",
        message: "Enter the manager's ID:",
        validate: (input) => {
          if (!input.match(/^\d+$/)) {
            return "Please enter a valid ID (a positive integer).";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "email",
        message: "Enter the manager's email:",
        validate: (input) => {
          if (!input.match(/\S+@\S+\.\S+/)) {
            return "Please enter a valid email address.";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "officeNumber",
        message: "Enter the manager's office number:",
        validate: (input) => {
          if (!input.match(/^\d+$/)) {
            return "Please enter a valid office number (a positive integer).";
          }
          return true;
        },
      },
    ])
    .then((managerData) => {
      const manager = new Manager(
        managerData.name,
        managerData.id,
        managerData.email,
        managerData.officeNumber
      );
      employees.push(manager);
      menu();
    });
}

// Function to add an engineer
function addEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the engineer's name:",
        validate: (input) => {
          if (input.trim() === "") {
            return "Name cannot be empty.";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "id",
        message: "Enter the engineer's ID:",
        validate: (input) => {
          if (!input.match(/^\d+$/)) {
            return "Please enter a valid ID (a positive integer).";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "email",
        message: "Enter the engineer's email:",
        validate: (input) => {
          if (!input.match(/\S+@\S+\.\S+/)) {
            return "Please enter a valid email address.";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "github",
        message: "Enter the engineer's GitHub username:",
        validate: (input) => {
          if (input.trim() === "") {
            return "GitHub username cannot be empty.";
          }
          return true;
        },
      },
    ])
    .then((engineerData) => {
      const engineer = new Engineer(
        engineerData.name,
        engineerData.id,
        engineerData.email,
        engineerData.github
      );
      employees.push(engineer);
      menu();
    });
}

// Function to add an intern
function addIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the intern's name:",
        validate: (input) => {
          if (input.trim() === "") {
            return "Name cannot be empty.";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "id",
        message: "Enter the intern's ID:",
        validate: (input) => {
          if (!input.match(/^\d+$/)) {
            return "Please enter a valid ID (a positive integer).";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "email",
        message: "Enter the intern's email:",
        validate: (input) => {
          if (!input.match(/\S+@\S+\.\S+/)) {
            return "Please enter a valid email address.";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "github",
        message: "Enter the intern's school name:",
        validate: (input) => {
          if (input.trim() === "") {
            return "School name cannot be empty.";
          }
          return true;
        },
      },
    ])
    .then((internData) => {
      const intern = new Intern(
        internData.name,
        internData.id,
        internData.email,
        internData.github
      );
      employees.push(intern);
      menu();
    });
}

function menu() {
  inquirer
    .prompt({
      type: "list",
      name: "menuChoice",
      message: "Choose an option:",
      choices: [
        "Add a Manager",
        "Add an Engineer",
        "Add an Intern",
        "Finish building the team",
      ],
    })
    .then((userChoice) => {
      switch (userChoice.menuChoice) {
        case "Add a Manager":
          addManager();
          break;
        case "Add an Engineer":
          addEngineer();
          break;
        case "Add an Intern":
          addIntern();
          break;
        case "Finish building the team":
          generateAndSaveHTML();
          break;
      }
    });
}

// Start the application by calling the menu function
menu();
