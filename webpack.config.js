const fs = require('fs');
const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { NODE_ENV, WEBPACK_DEVTOOL } = process.env

const SETTINGS = {
	DEVTOOL: WEBPACK_DEVTOOL || 'source-map',
	SRCDIR: path.join(__dirname, 'client'),
	OUTDIR: path.join(__dirname, 'build'),
};

const dev = {
	entry: [
		'webpack/hot/dev-server',
		'webpack-hot-middleware/client',
		path.join(SETTINGS.SRCDIR, 'bundle.js'),
	],
	devtool: SETTINGS.DEVTOOL,
	output: {
		path: SETTINGS.OUTDIR,
		filename: 'bundle.js',
	},
	resolve: {
		extensions: ['.js'],
		modules: [
			'node_modules', 
			'client'
		]
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loaders: ['react-hot-loader/webpack', 'babel-loader?presets[]=es2015,presets[]=stage-2,presets[]=react']
			},
			{
				test: /\.scss$/,
				loaders: ['style-loader', 'css-loader', 'sass-loader']
			},
			{
				test: /\.(png|jpe?g|gif|svg|ttf|woff2?)$/,
				loader: 'url-loader?limit=8192'
			}
		],
	},
	devServer: {
		contentBase: SETTINGS.OUTDIR,
		noInfo: true,
		hot: true,
		inline: true,
	},
	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new CopyWebpackPlugin([{
			from: path.join(SETTINGS.SRCDIR, 'index.html')
		}]),
		new webpack.optimize.ModuleConcatenationPlugin(),
	],
	node: {
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
		dns: 'empty',
	},
};


const prod = {
	...dev,
	entry: [
		path.join(SETTINGS.SRCDIR, 'bundle.js'),
	],
	plugins: [
		new CopyWebpackPlugin([{
			from: path.join(SETTINGS.SRCDIR, 'index.html'),
		}]),
		new webpack.DefinePlugin({
			'process.env': JSON.stringify({
				NODE_ENV: 'production',
			}),
		}),
		new webpack.optimize.ModuleConcatenationPlugin()
	]
};

module.exports = ( NODE_ENV === 'production' ) ?
	prod :
	dev;