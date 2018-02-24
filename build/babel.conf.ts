import config from '../config';
import { isProd } from './utils';

const presets: any[] = [
  '@babel/preset-stage-3',
  '@babel/preset-react',
  '@babel/preset-typescript',
];
const plugins: any[] = [];

if (isProd) {
  presets.unshift(['@babel/preset-env', config.build.babel.envOptions]);
} else {
  presets.unshift('@babel/preset-env');
}

export default {
  presets,
  plugins,
};
