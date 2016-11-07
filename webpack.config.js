var webpack = require('webpack');

module.exports = {
    entry: [
        './js/review.js'
    ],
    output: {
        path: __dirname + '/build/webpackd',
        filename: "review_bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        })
    ]

};