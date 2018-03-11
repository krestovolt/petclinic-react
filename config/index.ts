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
      title: 'Pet Clinic',
      inject: false,
      template: htmlWebpackTemplate,
      appMountId: 'app',
      links: ['/static/css/global.css'],
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
        targets: { browsers: ['defaults', 'safari >= 8'] },
      },
    },

    html: {
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks
      // via CommonsChunkPlugin
      chunksSortMode: 'dependency' as 'dependency',
    },

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',
  },
};
