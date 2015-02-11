'use strict';

var gulp = require('gulp');
var stylish = require('jshint-stylish');
var jshint = require('gulp-jshint');
var karma = require('karma').server;
var rename = require("gulp-rename");
var browserify = require('browserify');
var transform = require('vinyl-transform');

// package details
var pkg = require('./package.json');

var banner = [
    '// <%= name %>.js <%= version %>',
    '// <%= homepage %>',
    '// <%= author %> \n',
    ].join('\n');



gulp.task('build-spec', function(){

    var files = [
        './test/spec/*Spec.js'];

    var browserified = transform(function(filename) {
        return browserify(filename).bundle();
    });

    return gulp.src(files)
        .pipe(browserified)
        .pipe(rename({suffix: '.bundle'}))
        .pipe(gulp.dest('./test/spec/'));
});

// static code analysis
gulp.task('lint', function(){

    var files = [
        './src/**/*.js',
        './test/spec/*.js',
        '!./**/*.bundle.js'];

    return gulp.src( files )
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter( stylish ));
});

/// executes the unit-tests using karma (run test once and exit)
gulp.task('test', ['build-spec'], function (done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done);
});

// process that monitors the files
gulp.task('watch', function() {

    var files = [
        './src/**/*.js',
        './test/spec/*.js'];

    // adds a watch that executes the tasks
    // everytime a source-file is modified
    return gulp.watch(files, ['lint', 'build']);
});
