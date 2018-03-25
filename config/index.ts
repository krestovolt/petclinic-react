import path from 'path';
// import htmlWebpackTemplate from 'html-webpack-template';
import { resolve } from './utils';

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
      template: './config/template.ejs',
      appMountId: 'app',
      links: ['/static/css/global.css'],
      scripts: [
        {
          src: '/static/js/spinner.js',
          type: 'text/javascript',
          async: true,
        },
      ],
      bodyHtmlSnippet: `
<div id="loading-full" class="pc-loading-full-container">
  <div class="pc-loading-full">
    <div class="pc-cube1 pc-cube"></div>
    <div class="pc-cube2 pc-cube"></div>
    <div class="pc-cube4 pc-cube"></div>
    <div class="pc-cube3 pc-cube"></div>
  </div>
</div>`,
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
