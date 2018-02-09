import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoprefixer from 'autoprefixer';

const extractSass = new ExtractTextPlugin({
    filename: "css/[name].[contenthash].css",
})

module.exports = {
	context: path.resolve(__dirname, 'src'),
	entry: {
        app: './index.js'
    } ,
	output: {
		path: path.resolve(__dirname, 'dist'),
      	filename: 'js/[chunkhash].[name].js'
    },
    devServer: {
		contentBase: path.join(__dirname, "dist"),
      	watchContentBase: true
    },
    module: {
		rules: [
        	{
          		test: /\.js$/,
          		exclude: /node_modules/,
				use: [
					{
				  		loader: 'babel-loader',
				  		options: {
				    		cacheDirectory: true,
				  		}
					}
          		]
        	},
        	{
          		test: /\.scss$/,
                exclude: /node_modules/,
	            use: extractSass.extract({
	                use: [{
	                    loader: "css-loader"
	                }, {
	                    loader: "sass-loader"
	                }, {
	                    loader: "postcss-loader",
                        options: {
                            plugins: function () { // post css plugins, can be exported to postcss.config.js
                                return [
                                    autoprefixer
                                ];
                            }
                        }
	                }],
	                // use style-loader in development
	                fallback: "style-loader",
                    publicPath: '../'
	            })
      		},
            {
                test: /\.css$/,
                include: /node_modules/,
                loader: extractSass.extract({
                    fallback: 'style-loader',
                    use: {
                        loader: 'css-loader',
                    },
                    publicPath: '../'
                }),
            },
            {
                test: /\.(png|jpg)$/,
                exclude: /node_modules/,
                loader: 'url-loader?limit=5000&name=img/img-[hash:6].[ext]',
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.mp4$/,
                loader: 'url-loader?limit=10000&name=videos/[name].[ext]'
            }
    	]
    },

    devServer: {
        port: 8080,
    },

    plugins: [
    	extractSass,
        new HtmlWebpackPlugin({
            filename: 'index.html', //Name of file in ./dist/
            template: 'index.html', //Name of template in ./src
            hash: true,
        }),
        new HtmlWebpackPlugin({
            filename: 'investors.html', //Name of file in ./dist/
            template: 'investors.html', //Name of template in ./src
            hash: true,
        }),
        new webpack.ProvidePlugin({ // inject ES5 modules as global vars
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Tether: 'tether',
            Popper: ['popper.js', 'default'],
        })
    ]
}
