const fs = require("fs");
const path = require("path");
const ignore = ['node_modules', 'uni_modules', 'unpackage', 'dist'];

function readDir(dirPath, level = 0, filterExt = '') {
  const files = fs.readdirSync(dirPath);
  const indent = '  '.repeat(level);
  let output = '';

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      output += `${indent}${file}\n`;
      output += readDir(filePath, level + 1, filterExt);
    } else {
      if (filterExt && path.extname(file) !== filterExt) {
        return;
      }
      output += `${indent}${file}\n`;
    }
  });

  return output;
}

module.exports = readDir;
