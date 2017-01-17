'use strict';

const fs = require('fs-extra');
const bestzip = require('bestzip');
const tmpDir = 'tmp/';

try {
  fs.ensureDirSync(tmpDir);
  fs.copySync('src/index.js', tmpDir + 'index.js');
  fs.copySync('node_modules/moment', tmpDir + 'node_modules/moment');
  fs.copySync('node_modules/moment-timezone', tmpDir + 'node_modules/moment-timezone');
} catch (ex) {
  console.log(ex);
}
