"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var webpack = require("webpack");
var webpackDevMiddleWare = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");
var webpackConfig = require('./../../webpack/webpack.base');
function hmr(app) {
    var compiler = webpack(webpackConfig);
    var middleware = webpackDevMiddleWare(compiler, {
        publicPath: webpackConfig.output.publicPath
    });
    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));
    var fs = middleware.fileSystem;
    app.get('*', function (req, res) {
        fs.readFile(path.join(__dirname, '../../client/app/index.html'), {}, function (err, file) {
            if (err)
                return res.sendStatus(404);
            res.send(file.toString());
        });
    });
}
exports.default = hmr;
;
//# sourceMappingURL=frontEnd.js.map