/**
 * Created by gary on 4/09/15.
 */

var gulp = require('gulp');
var sourcemaps= require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var less = require('gulp-less');
var refresh = require('gulp-livereload');
var lr = require('tiny-lr');
var server = lr();
var minifyCSS = require('gulp-minify-css');
var embedlr = require('gulp-embedlr');

gulp.task('scripts', function() {
    gulp.src(['app/src/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('dest.js'))
        .pipe(gulp.dest('dist/build'))
        .pipe(refresh(server));
});

gulp.task('styles', function() {
    gulp.src(['app/css/style.less'])
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(refresh(server));
});

gulp.task('lr-server', function() {
    server.listen(35729, function(err) {
        if(err) return console.log(err);
    });
});

gulp.task('html', function() {
    gulp.src("app/*.html")
        .pipe(embedlr())
        .pipe(gulp.dest('dist/'))
        .pipe(refresh(server));
});

gulp.task('connect', function() {
    connect.server({
        root: './app',
        livereload: true
    });
});

gulp.task('default', function() {
    gulp.run('lr-server', 'scripts', 'styles', 'html');

    gulp.watch('app/src/**', function(event) {
        gulp.run('scripts');
    });

    gulp.watch('app/css/**', function(event) {
        gulp.run('styles');
    });

    gulp.watch('app/**/*.html', function(event) {
        gulp.run('html');
    })
});

gulp.task('start', ['default', 'connect']);
