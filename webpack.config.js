const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

function resolve (dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    entry: resolve('demo/index.js'),
    module: {
        rules: [{
            test: /\.ts$/,
            use: "ts-loader"
        }, {
            test: /\.less$/,
            use: ["style-loader", "css-loader", 'less-loader']  
        },{
            test: /\.(gif|png|jpg|woff|svg|ttf|eot)\??.*$/,
            loader: {
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: './resource/[name].[ext]',
                },
            }
        }]
    },  
    resolve: {
        extensions: [
            '.js', 
            '.ts'
        ]
    },
    devServer: {
        contentBase: resolve('/dist'),
        host: 'localhost',
        port: '8090',
        open: true
    },
    plugins: [
        new CleanWebpackPlugin('dist'),
        new HtmlWebpackPlugin({
            template: resolve('demo/index.html')
        })
    ]
}