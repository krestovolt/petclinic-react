import config from './index';
import { isProd } from './utils';

const presets: any[] = [
  ['@babel/preset-env', { modules: false }],
  ['@babel/preset-stage-3', { loose: true }],
  '@babel/preset-react',
  '@babel/preset-typescript',
];
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
  '@babel/plugin-proposal-decorators',
  ['@babel/transform-runtime', { polyfill: false }],
];

if (isProd()) {
  presets[0][1] = {
    ...presets[0][1],
    ...config.build.babel.envOptions,
  };
  plugins.push(['transform-remove-console', { exclude: ['error', 'warn'] }]);
} else {
  plugins.push('react-hot-loader/babel');
}

export default {
  plugins,
  presets,
  sourceMap: true,
};
