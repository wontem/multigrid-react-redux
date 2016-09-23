var Webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var WebpackConfig = require('./webpack.config');

new WebpackDevServer(Webpack(WebpackConfig), {
    contentBase: 'src/',
    filename: WebpackConfig.output.filename,
    publicPath: WebpackConfig.output.publicPath,
    inline: true,
    quiet: false,
    noInfo: false,
    hot: true,
    stats: {
        colors: true,
    },
    watchOptions: {
        poll: 1000,
        aggregateTimeout: 300,
    },
}).listen(8080);
