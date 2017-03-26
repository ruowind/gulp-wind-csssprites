'use strict';

let through = require('through2'),
    gutil = require('gulp-util'),
    PluginError = gutil.PluginError,
    // path = require('path'),
    cssParser = require('./libs/cssParser');

const PLUGIN_NAME = 'gulp-wind-csssprites';

function main() {
    let step1 = function (file, enc, cb) {
        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
            return cb();
        }
        let fileString = String(file.contents);
        let res=cssParser(fileString);
        file.contents=new Buffer(res.content);
        this.push(file);
        cb();
    };

    return through.obj(step1);
}

module.exports = main;