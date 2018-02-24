import path from 'path';
import htmlWebpackTemplate from 'html-webpack-template';
import { resolve } from '../build/utils';

export default {
  common: {
    /**
     * path configurations
     */
    paths: {
      assetSubDir: 'static',
      assetPublicPath: '/',
    },

    html: {
      inject: false,
      template: htmlWebpackTemplate,
      appMountId: 'app',
    },
  },

  dev: {
    /**
     * Various Dev Server settings
     */
    server: {
      host: 'localhost', // can be overwritten by process.env.HOST
      // tslint:disable-next-line:max-line-length
      port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
      autoOpenBrowser: false,
      errorOverlay: true,
      notifyOnErrors: true,
      // tslint:disable-next-line:max-line-length
      poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    },

    /**
     * Source Maps
     */
    devtool: 'cheap-module-eval-source-map',
  },

  build: {
    paths: {
      output: resolve('dist'),
    },

    babel: {
      envOptions: {
        targets: { browsers: ['last 2 versions', 'safari >= 8'] },
      },
    },
  },
};
