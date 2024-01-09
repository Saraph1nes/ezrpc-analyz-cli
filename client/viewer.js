import {render} from 'preact';
import Chart from "./components/Chart";
import {store} from "./store";

// let ws;
// try {
//   if (window.enableWebSocket) {
//     ws = new WebSocket(`ws://${location.host}`);
//   }
// } catch (err) {
//   console.warn(
//     "Couldn't connect to analyzer websocket server so you'll have to reload page manually to see updates in the treemap"
//   );
// }

window.addEventListener('load', () => {
  store.setAnalyzerData(window.analyzerData);
  store.setProjectName(window.projectName);
  store.setBranchName(window.branchName);

  render(
    <Chart/>,
    document.getElementById('app')
  );

  // if (ws) {
  //   ws.addEventListener('message', event => {
  //     const msg = JSON.parse(event.data);
  //
  //     if (msg.event === 'chartDataUpdated') {
  //       console.log(msg.data)
  //     }
  //   });
  // }
}, false);
