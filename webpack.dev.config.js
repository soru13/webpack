const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
module.exports = {
    mode: 'development',
	entry: {
        //common : [
        //    'react',
        //    'react-dom',
        //    'jquery',
        //],
        home:path.resolve(__dirname, "src/js/index.js"),
    },
    output: {
		path: path.resolve(__dirname, "dist"),
        filename: './[name].js',
        publicPath:'./dist/',
        chunkFilename: "js/[id].[chunkhash].js"
    },
    module:{
    	rules:[
    		//aqui van los loaders
            //test: que tipo de archivo quiero reconocer
            //use:que loader seva a encargar del archivo
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env','react','stage-2'],
                        plugins: ['syntax-dynamic-import'],
                    }
                },
            },  
            //imagenes loaders
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 100000,
                    }
                  }
                ]
            },
            {
                test: /\.(woff|eot|ttf|svg)$/,
                use: {
                        loader: 'file-loader'
                }
            },
            //videos loaders
            {
                test: /\.(mp4)$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 100000,
                      mimetype: "video/mp4",
                      name: 'video/[name].[hash].[ext]'
                    }
                  }
                ]
            },
            //Css Loaders
            {
    			test: /\.css$/,
                use: [
                  'style-loader',
                  { loader: 'css-loader', options: { importLoaders: 1 } },
                  'postcss-loader'
                ]
    		}
    	]
    },
    plugins:[
    	//aqui van los plugins
    	 new MiniCssExtractPlugin({
            filename: "src/css/[name].css",

        }),
         new webpack.DllReferencePlugin({
          manifest: require('./modules-manifest.json')
        })
    ]//,
    //optimization: {
        //splitChunks: {
            //name: "common",
           // chunks: "initial",
            //minChunks: Infinity
        //}
   // }
}