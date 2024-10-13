
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);

if (args.length < 1) {
  console.error('Usage: deploy <project-directory>');
  process.exit(1);
}

const projectDir = path.resolve(args[0]);

if (!fs.existsSync(projectDir)) {
  console.error(`Error: Directory ${projectDir} does not exist.`);
  process.exit(1);
}

console.log(`Packaging project files from ${projectDir}...`);

// Simulate packaging project files
setTimeout(() => {
  console.log('Project files packaged successfully.');
  // Here you would typically send the packaged files to the backend for deployment
}, 2000);
