const fs = require('fs');
const path = require('path');

const sourcePath = path.join(__dirname, 'files');
const destPath = path.join(__dirname, 'files-copy');

function copyDir() {
  fs.mkdir(destPath, { recursive: true }, () => {});
  fs.readdir(destPath, (err, files) => {
    files.forEach((file) => {
      const filePath = path.join(destPath, file);
      fs.unlink(filePath, () => {});
    });
  });
  fs.readdir(sourcePath, (err, files) => {
    files.forEach((file) => {
      const filePath = path.join(sourcePath, file);
      const copyFilePath = `${destPath}/${file}`;
      fs.copyFile(filePath, copyFilePath, () => {});
    });
  });
}
copyDir();
