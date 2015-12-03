var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');

gulp.task('build:dist', ['build:dist-min', 'build:dist-debug']);

gulp.task('build:dist-min', function buildDist(callback) {
    // run webpack
    var config = require('./../webpack.config');
    config.plugins = [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ];
    webpack(config, function onCompleteFromWebpack(err, stats) {
        if (err) {
            throw new gutil.PluginError('webpack', err);
        }
        gutil.log('[webpack]', stats.toString());
        callback();
    });
});

gulp.task('build:dist-debug', function buildDist(callback) {
    // run webpack
    var config = require('./../webpack.debug.config');
    config.plugins = [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ];
    webpack(config, function onCompleteFromWebpack(err, stats) {
        if (err) {
            throw new gutil.PluginError('webpack', err);
        }
        gutil.log('[webpack]', stats.toString());
        callback();
    });
});


