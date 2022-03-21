//const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const webpack = require('webpack');
const isDev = process.VUE_CLI_SERVICE.mode === 'development';

const plugins = [
	new webpack.NormalModuleReplacementPlugin(
		/element-ui[\/\\]lib[\/\\]locale[\/\\]lang[\/\\]zh-CN/,
		'element-ui/lib/locale/lang/en'
	),
];

// if (!isDev) {
// 	plugins.push(
// 		new BundleAnalyzerPlugin({
// 			analyzerPort: 5432,
// 			analyzerHost: '127.0.0.1',
// 		})
// 	);
// }

module.exports = {
	// publicPath: 'vip-person',
	css: {
		loaderOptions: {
			sass: {
				prependData: `@import '@/assets/scss/imports.scss';`,
				sourceMap: isDev,
			},
		},
	},
	configureWebpack: {
		plugins,
		// module: {
		// 	rules: [
		// 		{
		// 			test: /\.scss$/,
		// 			use: ['sass-loader', 'group-css-media-queries-loader'],
		// 		},
		// 	],
		// },
	},
};
