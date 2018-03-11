import webpack from 'webpack';
import config from '../config';
import babelOptions from './babel.conf';
import { resolve, assetsPath } from './utils';

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
    alias: {
      '@': resolve('src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: [/node_modules/, resolve('build'), resolve('config')],
        loader: 'babel-loader',
        options: babelOptions,
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('img/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('media/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('fonts/[name].[hash:7].[ext]'),
        },
      },
    ],
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
};

export default base;
