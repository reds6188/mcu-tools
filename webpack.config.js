const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
	entry: "./src/index.js",
	output: {
		filename: "[name].bundle.js",
		path: path.resolve(__dirname, "dist"),
		clean: true
	},
	optimization: {
		splitChunks: {
			chunks: "all"
		}
	},
	module: {
		rules: [
			{
				test: /\.html$/i,
				loader: "html-loader"
			},
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html"
		})
	],
	devServer: {
		static: path.join(__dirname, "dist"),
		compress: true,
		port: 9000,
		open: true // ⚡ apre automaticamente il browser
	},
	mode: "development"
};