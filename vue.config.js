const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const webpack = require('webpack');
const isDev = process.env.BUILD_MODE === 'D';

const plugins = [
	new webpack.NormalModuleReplacementPlugin(
		/element-ui[\/\\]lib[\/\\]locale[\/\\]lang[\/\\]zh-CN/,
		'element-ui/lib/locale/lang/en'
	),
];

if (!isDev) {
	plugins.push(
		new BundleAnalyzerPlugin({
			// analyzerMode: 'server',
			analyzerPort: 5000,
			analyzerHost: '127.0.0.1',
		})
	);
}

module.exports = {
	// publicPath: 'vip-person',
	configureWebpack: {
		plugins,
	},
	css: {
		loaderOptions: {
			sass: {
				prependData: `
					@import "@/assets/scss/mixins.scss";
					@import "@/assets/scss/vars.scss";
				`,
			},
		},
	},
};
