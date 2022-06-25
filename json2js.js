const fs = require('fs');
const path = require('path');
const EXTENSION = /\.[0-9a-z]{1,5}$/i;
const EXT_JS = '.js';
const EXT_JSON = '.json';
const writeJs = (json, dirpath, name) =>
  fs.writeFileSync(
    path.join(dirpath, name + EXT_JS),
    'module.exports = ' + JSON.stringify(json, null, 2)
  );
const directories = dirpath => {
  for (const dirent of fs.readdirSync(dirpath, { withFileTypes: true })) {
    const entpath = path.join(dirpath, dirent.name);
    if (dirent.isDirectory()) {
      directories(entpath);
      continue;
    }
    const arr = dirent.name.match(EXTENSION);
    if (!arr) {
      continue
    }
    const ext = arr[0];
    switch (ext.toLowerCase()) {
      case EXT_JSON:
        console.log(entpath);
        writeJs(
          require(entpath),
          dirpath,
          dirent.name.substring(0, dirent.name.length - ext.length)
        );
        break;
    }
  }
};
directories(__dirname);