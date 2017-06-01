const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './src/js/index.js',
        category: './src/js/category.js',
        cart: './src/js/cart.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "js/[name].js"
        
    },
    module: {
       rules: [
           {
                test: /\.js/,
                loader: 'babel-loader',
                include: [path.resolve(__dirname, './src')],
                exclude: [path.resolve(__dirname, '/node_modules')],
                options: { presets: ['env']}
           },
           {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1 
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'stylus-loader'
                    }
                ]
           },
           {
               test: /\.styl$/,
               use: ['style-loader', 'css-loader', 'postcss-loader', 'stylus-loader']
           },
           {
                test: /\.(png|jpg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                        limit: 10000,
                        name: 'images/[name]-[hash:5].[ext]'
                    }
                    }
                ],
                
           },
           {
               test: /\.html$/,
               use: ['html-withimg-loader']
           },
       ]
    },
    devServer: {
        host: '0.0.0.0',
        port: 8080
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: 'head',
            excludeChunks: ['category', 'cart'],
            title: 'my index'
        }),
        new htmlWebpackPlugin({
            filename: 'category.html',
            template: 'category.html',
            inject: 'head',
            excludeChunks: ['index', 'cart'],
            title: 'my category'
        }),
        new htmlWebpackPlugin({
            filename: 'cart.html',
            template: 'cart.html',
            inject: 'head',
            excludeChunks: ['index', 'category'],
            title: 'my cart'
        })
    ]

}