const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './js'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015'],
                        plugins: ['transform-class-properties'],
                    }
                }
            },
            {
                test: /\.(glsl|frag|vert)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'raw-loader',
                }
            },
            {
                test: /\.(glsl|frag|vert)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'glslify-loader',
                }
            }
        ]
    }
};
