const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: true
            })
        ]
    },
    plugins: [
        new webpack.NamedChunksPlugin(function(chunk) {
            if (chunk.name) return chunk.name;
            for (let m of chunk._modules) {
                if (regex.test(m.context)) {
                    if (m.issuer && m.issuer.id) {
                        return path.basename(m.issuer.rawRequest);
                    } else {
                        return path.basename(m.rawRequest);
                    }
                }
            }
        })
    ],
});
