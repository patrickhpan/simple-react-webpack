module.exports = [
	{
		test: /\.jsx?$/,
		exclude: /(node_modules)/,
		loaders: ['react-hot-loader', 'babel-loader?presets[]=es2015,presets[]=react']
	},
	{
		test: /\.scss$/,
		loaders: ['style-loader', 'css-loader', 'sass-loader']
	},
	{
		test: /\.(png|jpe?g|gif|svg|ttf|woff2?)$/,
		loader: 'url-loader?limit=8192'
	}
];