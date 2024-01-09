import {runCodeAnalyzer} from "../lib";
import startServer from "../lib/viewer";

const createAction = async (cmd, env) => {
  // 默认值
  if (Object.keys(cmd).length === 0 || cmd.serve) {
    const analyzerData = await runCodeAnalyzer();
    await startServer(analyzerData);
  }
  if (cmd.report) {
    console.log('cmd.report')
  }
}

export {
  createAction
}
