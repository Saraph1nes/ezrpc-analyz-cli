const compact = require('lodash/compact');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = Object.assign(require('./webpack.common'), {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimize: true, minimizer: [new TerserPlugin({
      parallel: true, terserOptions: {
        output: {
          comments: /copyright/iu
        }, safari10: true
      }
    })]
  },
  module: {
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
            plugins: compact([require('postcss-icss-values'), require('autoprefixer'), require('cssnano')()])
          }
        }
      }]
    }, {
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/u, loader: 'url-loader'
    }]
  }, plugins: (plugins => {
    plugins.push(new BundleAnalyzerPlugin({analyzerPort: 8081}));
    plugins.push(new webpack.DefinePlugin({
      'process': JSON.stringify({
        env: {
          NODE_ENV: 'production'
        }
      }), 'global': 'undefined'
    }));
    return plugins;
  })([])
})
