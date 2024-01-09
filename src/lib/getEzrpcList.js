import fs from "fs";
import {fileReader} from "./utils.js";

const getEzrpcComponentNameList = async () => {
  const filePath = process.cwd() + '/node_modules/ezrpc/lib/index.js';
  const fileStr = await fileReader(filePath);
  const arr = exportStr2Arr(fileStr);
  return arr;
}

const exportStr2Arr = (content) => {
  let ex = [];
  const regex = /export\s*\{([\s\S]+?)\}\s*;/;

  const match = content.match(regex);
  if (match) {
    ex = match[1].split(",").map(s => s.trim());
  }
  return ex;
}

export {
  getEzrpcComponentNameList
}
