import http from "http";
import sirv from "sirv";
import path from "path";
import {renderViewer} from "./template";
import {clog, open} from "./utils";
// import WebSocket from "ws";
const { spawnSync } = require('child_process');

const projectRoot = path.resolve(__dirname, '../..');

const startServer = async (analyzerData) => {
  const sirvMiddleware = sirv(`${projectRoot}/public`, {
    dev: true
  });

  const result = spawnSync('git', ['rev-parse', '--abbrev-ref', 'HEAD'], { encoding: 'utf-8' });
  const branchName = result.stdout.trim();
  const projectName = path.basename(process.cwd());

  const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
      res.statusCode = 200;
      res.writeHead(200, {'Content-Type': 'text/html'});
      const htmlContent = renderViewer(analyzerData, branchName, projectName);
      res.end(htmlContent);
    } else {
      sirvMiddleware(req, res);
    }
  });

  await new Promise(resolve => {
    server.listen(3000, () => {
      resolve();
      clog('\n页面渲染完成，点击查看', 'green');
      clog('http://localhost:3000', 'green');
      open('http://localhost:3000', clog)
    });
  });

  // clog('建立WebSocket服务器', 'green')
  //
  // const wss = new WebSocket.Server({server});
  // wss.on('connection', (ws) => {
  //   clog('客户端已连接', 'green')
  //   // setInterval(() => {
  //   //   ws.send(JSON.stringify({
  //   //     event: 'chartDataUpdated',
  //   //     data: {
  //   //       name: 'root',
  //   //     }
  //   //   }));
  //   // }, 2000)
  //   ws.on('close', () => {
  //     clog('客户端已断开', 'green')
  //   });
  // });

}


export default startServer;
