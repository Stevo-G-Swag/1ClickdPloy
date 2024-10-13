
#!/bin/bash

# Create a sample project directory
mkdir -p /home/user/web-app/test-project
echo '{}' > /home/user/web-app/test-project/package.json

# Test the deployment
curl -X POST http://localhost:3001/deploy -H "Content-Type: application/json" -d '{"projectDir": "/home/user/web-app/test-project"}'
