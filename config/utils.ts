import path from 'path';
import config from './index';

export const resolve = (dir: string = '') => path.resolve(__dirname, '..', dir);

export const isProd = () => process.env.NODE_ENV === 'production';

export const assetsPath = (p: string) =>
  path.posix.join(config.common.paths.assetSubDir, p);
