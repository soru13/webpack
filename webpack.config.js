const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = (env) => {
    const plugins = [
        //aqui van los plugins
         new MiniCssExtractPlugin({
            filename: "src/css/[name].css",
        }),
         new webpack.DllReferencePlugin({
          manifest: require('./modules-manifest.json')
        }),
        new MiniCssExtractPlugin({
          filename: "[name].css",
          chunkFilename: "[id].css"
        })
    ]
    if (env.NODE_ENV === 'production' ) {
        plugins.push(
            new CleanWebpackPlugin(['dist'],{root:__dirname})
        )
    }
    return {
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
            filename: './[name].[hash].js',
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
                            presets: ['babel-preset-env','react']
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
                      MiniCssExtractPlugin.loader,
                      "css-loader"
                    ]
                }
            ]
        },
        optimization: {
            minimizer: [
              new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
              }),
              new OptimizeCSSAssetsPlugin({})
            ]
          },
        plugins: [
            new ExtractTextPlugin("css/[name].css"),
        ]
    }
}