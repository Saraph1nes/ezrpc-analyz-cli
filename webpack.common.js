module.exports = {
  context: __dirname, entry: './client/viewer', output: {
    clean: true, // 在生成文件之前清空 output 目录
    path: `${__dirname}/public`, filename: 'viewer.js', publicPath: '/'
  }, resolve: {
    extensions: ['.js', '.jsx'], alias: {
      react: 'preact/compat', 'react-dom/test-utils': 'preact/test-utils', 'react-dom': 'preact/compat',
    }
  }, performance: {
    hints: false
  },
}
