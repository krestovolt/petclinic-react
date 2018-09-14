import config from './index';
import { isProd } from './utils';

const babelPreset = '@babel/preset-env';
const presets: any[] = [babelPreset, '@babel/preset-react', '@babel/preset-typescript'];
const plugins: any[] = [
	[
		'import',
		{ libraryName: 'antd', libraryDirectory: 'es', style: true },
		// [
		//   { libraryName: 'antd', libraryDirectory: 'es', style: true },
		//   {
		//     libraryName: 'lodash',
		//     libraryDirectory: '',
		//     camel2DashComponentName: false,
		//     camel2UnderlineComponentName: false,
		//   },
		// ],
	],
	['@babel/plugin-proposal-decorators', { legacy: true }],
	'@babel/plugin-proposal-function-sent',
	'@babel/plugin-proposal-export-namespace-from',
	'@babel/plugin-proposal-numeric-separator',
	'@babel/plugin-proposal-throw-expressions',
	'@babel/plugin-syntax-dynamic-import',
	['@babel/plugin-proposal-class-properties', { loose: true }],
	[
		'@babel/plugin-transform-runtime',
		{
			helpers: true,
			regenerator: true,
			useESModules: true,
		},
	],
	'@babel/plugin-transform-async-to-generator',
];

if (isProd()) {
	presets[0] = [babelPreset, { ...config.build.babel.envOptions }];
	plugins.push(['transform-remove-console', { exclude: ['error', 'warn'] }]);
} else {
	plugins.push('react-hot-loader/babel');
}

export default {
	plugins,
	presets,
	sourceMap: true,
};
