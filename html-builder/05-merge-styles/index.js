const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');
const writableStream = fs.createWriteStream(bundlePath);

fs.readdir(
  path.join(__dirname, 'styles'),
  { withFileTypes: true },
  (err, files) => {
    files.forEach((file) => {
      if (file.isFile()) {
        const filePath = path.join(__dirname, 'styles', file.name);
        const ext = path.extname(filePath).slice(1);
        if (ext === 'css') {
          const readableStream = fs.createReadStream(filePath);
          readableStream.on('data', (chunk) => writableStream.write(chunk));
        }
      }
    });
  },
);
