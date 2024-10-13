
const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const { generateMissingFiles } = require('./ai-agent');
const app = express();
const port = 3001;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend server is running');
});

app.post('/deploy', (req, res) => {
  const projectDir = req.body.projectDir;

  if (!fs.existsSync(projectDir)) {
    return res.status(400).send(`Error: Directory ${projectDir} does not exist.`);
  }

  // Generate missing configuration files
  generateMissingFiles(projectDir);

  // Framework detection logic
  let framework = '';
  if (fs.existsSync(path.join(projectDir, 'package.json'))) {
    framework = 'node';
  } else if (fs.existsSync(path.join(projectDir, 'requirements.txt'))) {
    framework = 'python';
  } else {
    return res.status(400).send('Error: Unsupported framework.');
  }

  // Dependency installation logic
  let installCommand = '';
  if (framework === 'node') {
    installCommand = 'npm install';
  } else if (framework === 'python') {
    installCommand = 'pip install -r requirements.txt';
  }

  exec(installCommand, { cwd: projectDir }, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).send(`Error installing dependencies: ${stderr}`);
    }

    res.send(`Dependencies installed successfully for ${framework} project.`);
  });
});

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
