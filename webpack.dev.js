const compact = require('lodash/compact');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = Object.assign(require('./webpack.common'), {
  mode: 'development', devtool: 'eval', watch: true, optimization: {
    minimize: false, minimizer: [new TerserPlugin({
      parallel: true, terserOptions: {
        output: {
          comments: /copyright/iu
        }, safari10: true
      }
    })]
  }, module: {
    rules: [{
      test: /\.jsx?$/u, exclude: /node_modules/u, loader: 'babel-loader', options: {
        babelrc: false,
        presets: [['@babel/preset-env', {
          // Target browsers are specified in .browserslistrc

          modules: false,
          useBuiltIns: 'usage',
          corejs: require('./package.json').devDependencies['core-js'],
          debug: true
        }], ['@babel/preset-react', {
          runtime: 'automatic', importSource: 'preact'
        }]],
        plugins: ['lodash', ['@babel/plugin-proposal-decorators', {legacy: true}], ['@babel/plugin-proposal-class-properties', {loose: true}], ['@babel/plugin-proposal-private-methods', {loose: true}], ['@babel/plugin-transform-runtime', {
          useESModules: true
        }],]
      }
    }, {
      test: /\.css$/u, use: ['style-loader', {
        loader: 'css-loader', options: {
          modules: {
            localIdentName: '[name]__[local]'
          }, importLoaders: 1
        }
      }, {
        loader: 'postcss-loader', options: {
          postcssOptions: {
            plugins: compact([require('postcss-icss-values'), require('autoprefixer'),])
          }
        }
      }]
    }, {
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/u, loader: 'url-loader'
    }]
  },
});
