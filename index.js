// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown');

// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project? (Required)',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please enter the title of your project!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'description',
        message: `Give a short description about your project. (Required)\nThe questions below serve as a criteria to include in your\ndescription to make your README stand out and look professional:\n* What was the motivation for your project?\n* Why did you build this project?\n* What problem did it solve?\n* What did you learn?\n* What makes your project stand out?\n`,
        validate: description => {
            if (description) {
                return true;
            } else {
                console.log('Please add a description for your project!');
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmIsLinkDeployed',
        message: 'Is your project deployed?',
        default: true
    },
    {
        type: 'input',
        name: 'deployedLink',
        message: 'Provide the deployed link for your application: (Required)',
        when: ({ confirmIsLinkDeployed }) => confirmIsLinkDeployed,
        validate: confirmIsLinkDeployed => {
            if (confirmIsLinkDeployed) {
                return true;
            } else {
                console.log('Please provide the deployed link for your application!');
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmTableOfContents',
        message: `If your README is very long, add a table of contents to make it easy for users to find what they need.\nFor a heads up your final README will include the following table of contents:\n* Installation instructions\n* Usage information\n* Contribution guidelines\n* Test instructions\nConsidering the above information, will you need a table of contents?`,
        default: true
    },
    {
        type: 'input',
        name: 'installationSteps',
        message: `What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running. Seperate each step with an asterisk (*) For example: step 1 * step 2 * step 3... \n`,
        validate: installationSteps => {
            if (installationSteps) {
                return true;
            } else {
                console.log('Please add a installation instruction for your project!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'usage',
        message: `Provide instructions and examples for use. Include screenshots as needed. Break down instructions into steps. Seperate each step with an asterisk (*)\n Be sure to have an 'assets/images/<yourscreenshot>' root folder in your repository where your screenshots will be located.\n Put the name of the screenshot with its file extension in single quotes \n Your entry should be in this format(Add as many steps/screenshots desired):\n step 1 * 'alt text,screenshotExample1.PNG' * step 2 * 'alt text,screenshotExample2.PNG' * step 3... \n`,
        validate: installationSteps => {
            if (installationSteps) {
                return true;
            } else {
                console.log('Please add a usage instruction for your project!');
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmCustomContributor',
        message: `If you created an application or package and would like other developers to contribute it, you will want to add guidelines for how to do so. The Contributor Convent(https://www.contributor-covenant.org/) is an industry standard adapted by Readmegen, but you can always write your own. \n Do you wish to write your own(If you don't, Readmegen will automatically add Contributor Convenant)?`,
        default: true
    },
    {
        type: 'input',
        name: 'contributing',
        message: `Enter your contribution guidelines \n `,
        when: ({ confirmCustomContributor }) => confirmCustomContributor,
        validate: installationSteps => {
            if (installationSteps) {
                return true;
            } else {
                console.log('Please add a contribution guidelines for your project!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'tests',
        message: `Go the extra mile and write tests for your application. Then provide examples on how to run them. \n Use the same format: step 1 * 'alt text,screenshotExample1.PNG' * step 2 * 'alt text,screenshotExample2.PNG' * step 3...\n`,
        validate: installationSteps => {
            if (installationSteps) {
                return true;
            } else {
                console.log('Please add a contribution guidelines for your project!');
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmLicense',
        message: `Do you want add a license to your project?`,
        default: true,
    },
    {
        type: 'list',
        name: 'license',
        message: 'What type of license do you prefer?',
        choices: [
            'Apache 2.0 License', // [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
            'GNU GPL v3 License', // [![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
            'The MIT License', // [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
        ],
        when: ({ confirmLicense }) => confirmLicense,
        filter: (val) => {
            return val.toLowerCase();
        },
    },
    {
        type: 'input',
        name: 'username',
        message: `Please enter your GitHub username: (Required)`,
        validate: username => {
            if (username) {
                return true;
            } else {
                console.log('Please fill out your username!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: `Please enter your email: (Required)`,
        validate: email => {
            if (email) {
                return true;
            } else {
                console.log('Please fill out your email!');
                return false;
            }
        }
    },
];


// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, ()=> console.log("Success! Check the 'dist' folder for your README.md file!"));
}



// TODO: Create a function to initialize app
function init() {
    inquirer.prompt(questions)
        .then(answers => {
            const data = generateMarkdown(answers);
            writeToFile('./dist/README.md', data);
        })
}

// Function call to initialize app
init();

