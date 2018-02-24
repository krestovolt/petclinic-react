// import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
import portfinder from 'portfinder';
import config from '../config';
import devEnv from '../config/dev.env';
import { resolve, isProd } from './utils';
import baseWebpackConfig from './webpack.base.conf';

const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);

const devWebpackConfig = merge(baseWebpackConfig, {
  entry: {
    app: ['react-hot-loader/patch', './src/index.tsx'],
  },
  devServer: {
    // clientLogLevel: 'warning',
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
  ],
});

export default new Promise((res, rej) => {
  portfinder.basePort = PORT || config.dev.server.port;
  portfinder.getPort((err, port) => {
    if (err) {
      rej(err);
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = `${port}`;
      // add port to devServer config
      devWebpackConfig.devServer.port = port;
      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `Your application is running at: http://${
                devWebpackConfig.devServer.host
              }:${devWebpackConfig.devServer.port}`,
            ],
            notes: [],
          },
        }),
      );

      res(devWebpackConfig);
    }
  });
});
