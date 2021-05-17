const licenseBadges = {
  "apache 2.0 license": {
    badge: "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)",
    descriptionLink: "https://choosealicense.com/licenses/apache-2.0/",
  },
  "gnu gpl v3 license": {
    badge: "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)",
    descriptionLink: "https://choosealicense.com/licenses/gpl-3.0/",
  },
  "the mit license": {
    badge: "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)",
    descriptionLink: "https://choosealicense.com/licenses/mit/",
  },
}

// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(confirmLicense, license) {
  if (!confirmLicense) return '';
  return licenseBadges[license].badge;
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(confirmLicense, license) {
  if (!confirmLicense) return '';
  return `\```md
  ${licenseBadges[license].badge}
  ``\` `
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(confirmLicense, license) {

  if (!confirmLicense) return '';

  return `Licensed under [${license.toUpperCase()}](${licenseBadges[license].descriptionLink})`;
}

// Instructions step formatter
function stepFormatter(data) {
  const dataSplit = data.split('*');
  const dataWithDash = dataSplit.map(element => {
    // Format screenshot
    let trimEl = element.trim()
    if(trimEl.startsWith("'") && trimEl.endsWith("'")){
      const screenshotDetails = trimEl.replace("'", '').replace("'", '').split(',');
      const [altText, name] = screenshotDetails;
      return `\n!['${altText}'](assets/images/${name})`;
    } else return `- ${trimEl}`;
  });

  return dataWithDash.join(`
  `)
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  return `# ${data.title}

${renderLicenseBadge(data.confirmLicense, data.license)}

## Description 

  ${data.description}  

  ${data.confirmIsLinkDeployed ? `- Deployed Link ${data.deployedLink}` : ''}
  
  
${data.confirmTableOfContents ? `## Table of Contents` : ''}
  
  ${data.confirmTableOfContents ? `
  * [Installation](#installation)
  * [Usage](#usage)
  ${data.confirmLicense ? `* [License](#license)` : ''}
  * [Contributing](#contributing)
  * [Tests](#tests)
  * [Questions](#questions)
  ` : ''
    }

## Installation

  ${stepFormatter(data.installationSteps)}
  
## Usage 
  
  ${stepFormatter(data.usage)}
  
${data.confirmLicense ? `## License` : ''}
  
  ${renderLicenseSection(data.confirmLicense, data.license)}

## Contributing
  ${data.confirmCustomContributor ? `- ${data.contributing}` :
      `Please read the [Contributor Covenant](https://www.contributor-covenant.org/version/2/0/code_of_conduct/)`
    }

## Tests
  ${stepFormatter(data.tests)}

## Questions
  - 👋 Hi, I’m ${data.username}
  - GitHub profile link: [github.com/${data.username}/](https://github.com/${data.username}/)
  - 📫 How to reach, email: ${data.email}
`;
}

module.exports = generateMarkdown;
