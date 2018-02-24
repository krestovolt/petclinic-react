// import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
import config from '../config';
import devEnv from '../config/dev.env';
import { resolve, isProd } from './utils';

const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);

const configure = (env: any): webpack.Configuration => ({
  devtool: config.dev.devtool as webpack.Options.Devtool,
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
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
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
  devServer: {
    clientLogLevel: 'warning',
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.server.host,
    port: PORT || config.dev.server.port,
    open: config.dev.server.autoOpenBrowser,
    quiet: true, // necessary for FriendlyErrorsPlugin
    overlay: config.dev.server.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.common.paths.assetPublicPath,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': devEnv,
    }),
    new webpack.HotModuleReplacementPlugin(),
    // HMR shows correct file names in console on update.
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin(config.common.html),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: resolve('static'),
        to: config.common.paths.assetSubDir,
        ignore: ['.*'],
      },
    ]),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [
          `Your application is running here: http://${
            config.dev.server.host
          }:${config.dev.server.port}`,
        ],
        notes: [],
      },
    }),
  ],
});

export default configure;
