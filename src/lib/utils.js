import fs from "fs";
import chalk from "chalk";
import opener from "opener";

const fileReader = (filePath) => {
  return new Promise((resolve, reject) => {
    try {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) throw err;
        resolve(data);
      });
    } catch (e) {
      reject(e)
    }
  })
}

const open = (uri, clog) => {
  try {
    opener(uri);
  } catch (err) {
    clog(`Opener failed to open "${uri}":\n${err}`, 'red');
  }
}

const clog = (msg, color='green', ...arg) => {
  return console.log(chalk[color](msg, arg))
};

const extractSrcPath = (filePath) => {
  const regex = /src(\/|\\).+/;
  const result = filePath.match(regex);
  if (result) {
    return result[0];
  }
  return '';
}


export {
  fileReader,
  open,
  clog,
  extractSrcPath
}
