import config from '../config';
import { isProd } from './utils';

const presets: any[] = [
  ['@babel/preset-env', {modules: false}],
  '@babel/preset-stage-3',
  '@babel/preset-react',
  '@babel/preset-typescript',
];
const plugins: any[] = [
  ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
  ['@babel/transform-runtime', { polyfill: false }],
];

if (isProd) {
  presets[0][1] = {
    ...presets[0][1],
    ...config.build.babel.envOptions,
  }
} else {
  plugins.push('react-hot-loader/babel');
}

export default {
  plugins,
  presets,
  sourceMap: true,
};
