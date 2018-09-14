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

import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const style = (vars: any = {}) => {
	const fallback = 'style-loader';
	const use = [
		{ loader: 'css-loader', options: { modules: false, importLoaders: 2 } },
		{ loader: 'postcss-loader', options: { plugins: () => autoprefixer() } },
		{ loader: 'less-loader' },
	];
	const test = /.less$/;

	const rule = {
		test,
		use: [fallback, ...use],
	};
	const extract = {
		test,
		use: ExtractTextPlugin.extract({
			fallback,
			use,
		}),
	};

	return { rule, extract };
};

export default style;
