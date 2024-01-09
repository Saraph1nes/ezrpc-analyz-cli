import {createAction} from "../actions";

export const createCommand = (program) => {
  program
    .command('analyse')
    .usage('[options]')
    .option('-s, --serve', '(默认)开启服务')
    .option('-r, --report', '生成报告')
    .description('分析ezrpc组件的使用情况')
    .action((cmd, env) => {
      createAction(cmd, env)
    })
}
