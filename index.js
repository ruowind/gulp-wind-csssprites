'use strict';

let through = require('through2'),
    gutil = require('gulp-util'),
    PluginError = gutil.PluginError,
    imgGen = require('./libs/image'),
    cssParser = require('./libs/cssParser');

const PLUGIN_NAME = 'gulp-wind-csssprites';

function main(config) {
    let step1 = function (file, enc, cb) {
        config = config ? config : {};
        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
            return cb();
        }
        let fileString = String(file.contents);
        let res = cssParser(fileString);

        let spritesCss = imgGen(file, res.map, this, config);
        file.contents = new Buffer(res.content + spritesCss);
        this.push(file);
        cb();
    };

    return through.obj(step1);
}

module.exports = main;