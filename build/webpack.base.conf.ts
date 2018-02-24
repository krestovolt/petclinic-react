import webpack from 'webpack';
import config from '../config';
import babelOptions from './babel.conf';
import { resolve } from './utils';

const base: webpack.Configuration = {
  context: resolve(),
  entry: {
    app: './src/index.tsx',
  },
  output: {
    path: config.build.paths.output,
    filename: '[name].js',
    publicPath: config.common.paths.assetPublicPath,
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', 'json', '.less'],
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: [
          /node_modules/,
          resolve('build'),
          resolve('config'),
        ],
        loader: 'babel-loader',
        options: babelOptions,
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
}

export default base;
