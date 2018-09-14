import prod from './prod.env';

export default {
	...prod,
	NODE_ENV: '"testing"',
};
