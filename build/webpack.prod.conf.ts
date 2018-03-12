/**
 *    Copyright 2018 Panjie Setiawan Wicaksono
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */
// tslint:disable-next-line:no-reference
/// <reference path="../typings/uglifyjs-webpack-plugin.d.ts" />

import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import OptimizeCSSPlugin from 'optimize-css-assets-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import config from '../config';
import prodEnv from '../config/prod.env';
import testingEnv from '../config/test.env';
import { assetsPath, resolve } from '../config/utils';
import style from '../config/style.conf';
import baseWebpackConfig from './webpack.base.conf';

const env = process.env.NODE_ENV === 'testing' ? testingEnv : prodEnv;

const webpackConfig = merge(baseWebpackConfig, {
  devtool: config.build.productionSourceMap
    ? (config.build.devtool as any)
    : false,
  module: {
    rules: [style().extract],
  },
  output: {
    path: config.build.paths.output,
    filename: assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: assetsPath('js/[id].[chunkhash].js'),
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env,
    }),
    new CleanWebpackPlugin(['dist'], { root: resolve() }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false,
        },
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true,
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: assetsPath('css/[name].[contenthash].css'),
      // Setting the following option to `false` will not extract CSS from
      // codesplit chunks. Their CSS will instead be inserted dynamically
      // with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are
      // included in the codesplit bundle as well when it's `false`,
      // increasing file size
      //  https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: true,
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true },
    }),
    new HtmlWebpackPlugin({
      ...config.common.html,
      ...config.build.html,
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(resolve('node_modules')) === 0
        );
      },
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
    }),
    // This instance extracts shared chunks from code splitted chunks and
    // bundles them in a separate chunk, similar to the vendor chunk
    // tslint:disable-next-line:max-line-length
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 2,
    }),

    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: resolve('static'),
        to: config.common.paths.assetSubDir,
        ignore: ['.*'],
      },
    ]),

    // new BundleAnalyzerPlugin(),
  ],
});

export default (e: any = {}) => {
  // To include BundleAnalyzerPlugin, run with --env.a argument
  // yarn build --env.a
  if (e.a) {
    webpackConfig.plugins.push(new BundleAnalyzerPlugin());
  }
  return webpackConfig;
};
