/**
 * time : 2017/1/1 0001.
 * author : chenzhihao
 * desc : webpack1 打包配置文件
 */


var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer');//自动补全兼容

process.noDeprecation = true

module.exports = {
    entry: ["babel-polyfill", "./src/lib/index.js"],
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'vueTest.js',
        library: 'vueTest',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                        test:  /\.css$/,
                        use: ['style-loader', 'css-loader']
                  },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    "css-loader",
                    {
                        loader: 'postcss-loader',
                        options: {           // 如果没有options这个选项将会报错 No PostCSS Config found
                            plugins: (loader) => [
                                require('postcss-import')({ root: loader.resourcePath }),
                                autoprefixer({ browsers: ['last 5 versions'] })   //自动兼容
                            ]
                        }
                    },
                    "sass-loader"
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader'
            }, {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader'
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                vue: {
                    js: 'babel-loader',
                    css: 'style-loader!css-loader?importLoader=1!postcss-loader',
                    scss: 'style-loader!css-loader!postcss-loader!sass-loader',
                    postcss: [autoprefixer({ browsers: ['last 5 versions'] })]
                }
            }
        })
    ],
    resolve: {
        extensions: ['*', '.js', '.vue', '.jsx'], //后缀名自动补全
        alias: {
            vue: "vue/dist/vue.js",
            store: path.resolve('src/store/'),
            router: path.resolve('src/router/'),
            components: path.resolve('src/components/'),
            pages: path.resolve('src/pages/'),
            ajax: path.resolve('src/ajax/'),
            utils: path.resolve('src/utils/')
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    performance: {
        hints: false
    }
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     sourceMap: true,
        //     compress: {
        //         warnings: false
        //     }
        // }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}
