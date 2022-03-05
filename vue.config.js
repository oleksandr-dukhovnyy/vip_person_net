// const BundleAnalyzerPlugin =
// 	require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const webpack = require('webpack');

module.exports = {
	// publicPath: 'vip-person',
	configureWebpack: {
		plugins: [
			// new BundleAnalyzerPlugin({
			// 	analyzerPort: 5000,
			// 	analyzerHost: '127.0.0.1',
			// }),
			new webpack.NormalModuleReplacementPlugin(
				/element-ui[\/\\]lib[\/\\]locale[\/\\]lang[\/\\]zh-CN/,
				'element-ui/lib/locale/lang/en'
			),
		],
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
