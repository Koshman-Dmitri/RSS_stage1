const fs = require('fs');
const path = require('path');

const distFolderPath = path.join(__dirname, 'project-dist');
const distFolderAssetsPath = path.join(distFolderPath, 'assets');

fs.mkdir(distFolderPath, { recursive: true }, () => {});
fs.mkdir(distFolderAssetsPath, { recursive: true }, () => {});
bundleHtml();
bundleCss();
fs.promises.rm(distFolderAssetsPath, { recursive: true }).then(() => {
  fs.promises.mkdir(distFolderAssetsPath, { recursive: true }).then(() => {
    copyAssets();
  });
});

function bundleHtml() {
  const templatePath = path.join(__dirname, 'template.html');
  const indexPath = path.join(distFolderPath, 'index.html');

  const rSTemplate = fs.createReadStream(templatePath, 'utf-8');
  rSTemplate.on('data', (data) => {
    let strData = '';
    strData = data.toString();
    fs.readdir(
      path.join(__dirname, 'components'),
      { withFileTypes: true },
      (err, files) => {
        files.forEach((file) => {
          if (file.isFile()) {
            const filePath = path.join(__dirname, 'components', file.name);
            const ext = path.extname(filePath);
            if (ext === '.html') {
              let componentName = file.name.replace(ext, '');
              componentName = `{{${componentName}}}`;

              const rSComponent = fs.createReadStream(filePath, 'utf-8');
              rSComponent.on('data', (chunk) => {
                strData = strData.replaceAll(componentName, chunk);
                fs.writeFile(indexPath, strData, () => {});
              });
            }
          }
        });
      },
    );
  });
}

function bundleCss() {
  const stylesPath = path.join(distFolderPath, 'style.css');
  const wS = fs.createWriteStream(stylesPath);

  fs.readdir(
    path.join(__dirname, 'styles'),
    { withFileTypes: true },
    (err, files) => {
      files.forEach((file) => {
        if (file.isFile()) {
          const filePath = path.join(__dirname, 'styles', file.name);
          const ext = path.extname(filePath).slice(1);
          if (ext === 'css') {
            const rs = fs.createReadStream(filePath);
            rs.on('data', (chunk) => wS.write(chunk));
          }
        }
      });
    },
  );
}

function copyAssets(p = path.join(__dirname, 'assets')) {
  fs.readdir(p, { withFileTypes: true }, (err, files) => {
    files.forEach((file) => {
      let curPath = path.join(p, file.name);
      if (file.isFile()) {
        const relativePath = curPath.slice(curPath.indexOf('assets') + 7);
        fs.copyFile(
          curPath,
          path.join(distFolderAssetsPath, relativePath),
          () => {},
        );
      } else {
        fs.mkdir(
          path.join(distFolderAssetsPath, file.name),
          { recursive: true },
          () => {},
        );
        copyAssets(curPath);
      }
    });
  });
}
