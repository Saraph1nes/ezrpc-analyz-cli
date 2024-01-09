import path from 'path';
import fs from 'fs';
import {clog, extractSrcPath, fileReader} from "./utils.js";
import {parse} from '@babel/parser';
import traverse from "@babel/traverse";
import shelljs from "shelljs";

// 获取根目录路径
const srcDirPath = path.resolve('./src');
const distDirPath = path.resolve('./dist');

async function analyzeFile(filePath, arr) {
  const code = await fileReader(filePath);
  const ast = parse(code, {
    sourceType: "module", plugins: ["jsx", "decorators"]
  });
  traverse(ast, {
    enter(path) {
      if (path.type === 'ImportDeclaration' && path.node.source.value === 'ezrpc') {
        for (const specifier of path.node.specifiers) {
          // console.log(extractSrcPath(filePath), specifier.local.name)
          arr.push({
            path: extractSrcPath(filePath),
            name: specifier.local.name
          })
        }
      }
    },
  });
}

async function traverseDirectory(currentDirPath, arr) {
  const files = fs.readdirSync(currentDirPath);
  for (const file of files) {
    const filePath = path.join(currentDirPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isFile() && ['.js', '.jsx'].includes(path.extname(filePath).toLocaleLowerCase())) {
      await analyzeFile(filePath, arr);
    } else if (stats.isDirectory()) {
      await traverseDirectory(filePath, arr);
    }
  }
}

async function cleanDist() {
  return new Promise((resolve, reject) => {
    shelljs.exec('npm run clean-dist', (code, stdout, stderr) => {
      if (code === 0) {
        clog('清理完成\n', 'green');
        resolve();
      } else {
        clog('清理失败\n', 'red');
        reject(new Error(stderr));
      }
    });
  });
}

async function buildProject() {
  return new Promise((resolve, reject) => {
    shelljs.exec('npm run build', (code, stdout, stderr) => {
      if (code === 0) {
        clog('\n打包项目完成', 'green');
        resolve();
      } else {
        clog('\n打包项目失败', 'red');
        reject(new Error(stderr));
      }
    });
  });
}

const runCodeAnalyzer = (opt) => {
  return new Promise(async (resolve, reject) => {
    const options = {
      needCleanDist: false,
      needBuildProject: false,
      ...opt
    }

    clog('\n开始分析流程..', 'green');

    if (options.needCleanDist){
      clog('\n正在清理dist...')
      try {
        await cleanDist();
      } catch (e) {
        clog('清理失败\n', 'red');
      }
    }

    if (options.needBuildProject){
      clog('\n正在打包项目...')
      try {
        await buildProject();
      } catch (e) {
        clog('\n打包项目失败', 'red');
      }
    }


    // clog('\n正在获取ezrpc组件列表...')
    // try {
    //   if (ezrpcComponentNameList.length === 0) {
    //     ezrpcComponentNameList = await getEzrpcComponentNameList();
    //   }
    //   clog('\n获取ezrpc组件列表成功', 'green');
    // } catch (e) {
    //   clog('\n获取ezrpc组件列表失败', 'red');
    // }


    try {
      clog('\n分析中...')
      try {
        const arr = [];
        await traverseDirectory(srcDirPath, arr)
        clog('\n分析成功', 'green');
        resolve(arr);
      } catch (e) {
        clog('\n分析失败', 'red');
      }
    }catch (err){
      reject({})
    }

    // const ezrpcComponentNameList = await getEzrpcComponentNameList();
    //
    // console.log('ezrpcComponentNameList', ezrpcComponentNameList)

    // traverseDirectory(componentsDirPath);

    // traverseDirectory(viewDirPath);
  });
}

export {
  runCodeAnalyzer
};
