
const fs = require('fs');
const path = require('path');

function generateMissingFiles(projectDir) {
  // Check for missing package.json in Node.js projects
  if (!fs.existsSync(path.join(projectDir, 'package.json'))) {
    const packageJson = {
      name: 'generated-project',
      version: '1.0.0',
      main: 'index.js',
      scripts: {
        start: 'node index.js'
      },
      dependencies: {}
    };
    fs.writeFileSync(path.join(projectDir, 'package.json'), JSON.stringify(packageJson, null, 2));
    console.log('Generated missing package.json');
  }

  // Check for missing requirements.txt in Python projects
  if (!fs.existsSync(path.join(projectDir, 'requirements.txt'))) {
    fs.writeFileSync(path.join(projectDir, 'requirements.txt'), '');
    console.log('Generated missing requirements.txt');
  }
}

module.exports = { generateMissingFiles };
