import webpack from 'webpack';
import config from '../config';
import babelOptions from '../config/babel.conf';
import { resolve, assetsPath, isProd } from '../config/utils';

const base: webpack.Configuration = {
	context: resolve(),
	entry: ['@babel/polyfill', './src/index.tsx'],
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
				use: [
					{
						loader: 'thread-loader',
						// loaders with equal options will share worker pools
						options: {
							// the number of spawned workers, defaults to number of cpus
							workers: isProd ? 2 : 3,

							// number of jobs a worker processes in parallel
							// defaults to 20
							workerParallelJobs: 50,

							// additional node.js arguments
							workerNodeArgs: ['--max-old-space-size=1024'],

							// timeout for killing the worker processes when idle
							// defaults to 500 (ms)
							// can be set to Infinity for watching builds to keep workers alive
							poolTimeout: 2000,

							// number of jobs the poll distributes to the workers
							// defaults to 200
							// decrease of less efficient but more fair distribution
							poolParallelJobs: 50,

							// name of the pool
							// can be used to create different pools with elsewise identical options
							name: 'babel-loader-pool',
						},
					},
					{
						loader: 'babel-loader',
						options: babelOptions,
					},
				],
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
