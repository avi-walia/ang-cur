'use strict';

var gulp = require('gulp');
// var uncss = require('gulp-uncss');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;

module.exports = function(options) {
  gulp.task('styles', function () {
    var sassOptions = {
      style: 'expanded'
    };

    //console.warn("options ----> %o",options);

    var injectFiles = gulp.src([
      options.src + '/app/**/*.scss',
      '!' + options.src + '/app/index.scss',
      '!' + options.src + '/app/vendor.scss'
    ], { read: false });

    var injectOptions = {
      transform: function(filePath) {
        filePath = filePath.replace(options.src + '/app/', '');
        return '@import \'' + filePath + '\';';
      },
      starttag: '// injector',
      endtag: '// endinjector',
      addRootSlash: false
    };


    var indexFilter = $.filter('index.scss');
    var vendorFilter = $.filter('vendor.scss');
    var cssFilter = $.filter('**/*.css');

    return gulp.src([
      options.src + '/app/index.scss',
      options.src + '/app/vendor.scss'
    ])
      .pipe(indexFilter)
      .pipe($.inject(injectFiles, injectOptions))
      .pipe(indexFilter.restore())
      .pipe(vendorFilter)
      .pipe(wiredep(options.wiredep))
      .pipe(vendorFilter.restore())
        .pipe($.sourcemaps.init({ loadMaps: true }))
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
      //.pipe($.rubySass(sassOptions)).on('error', options.errorHandler('RubySass'))
        // .pipe(uncss({
        //   html: ['./src/index.html','./src/app/**/*.html']
        // }))
      .pipe(cssFilter)
      .pipe($.autoprefixer()).on('error', options.errorHandler('Autoprefixer'))
      .pipe($.sourcemaps.write())
      .pipe(cssFilter.restore())
      .pipe(gulp.dest(options.tmp + '/serve/app/'))
      .pipe(browserSync.reload({ stream: true }));
  });
};
