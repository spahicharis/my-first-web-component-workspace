const fs = require('fs');
const path = require('path');

// Source and destination paths
const source = path.join(__dirname, 'helpers', 'package.json');
const destinationDir = path.join(__dirname, 'dist', 'web-component-result');
const destination = path.join(destinationDir, 'package.json');

// Check if destination directory exists, if not, create it
if (!fs.existsSync(destinationDir)) {
  fs.mkdirSync(destinationDir, { recursive: true });
}

// Copy the file
fs.copyFile(source, destination, (err) => {
  if (err) {
    console.error('Error copying file:', err);
  } else {
    console.log('File copied successfully!');
  }
});
