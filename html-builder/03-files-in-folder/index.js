const fs = require('fs');
const path = require('path');

const myPath = path.join(__dirname, 'secret-folder');
fs.readdir(myPath, { withFileTypes: true }, (err, files) => {
  files.forEach((file) => {
    if (file.isFile()) {
      const filePath = path.join(myPath, file.name);
      const ext = path.extname(filePath).slice(1);
      const name = path.basename(filePath).replace(`.${ext}`, '');
      fs.stat(filePath, (err, stats) => {
        console.log(`${name} - ${ext} - ${(+stats.size / 1024).toFixed(3)}kb`);
      });
    }
  });
});
