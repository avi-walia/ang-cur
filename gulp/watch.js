'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');

function isOnlyChange(event) {
  return event.type === 'changed';
}

module.exports = function(options) {
  gulp.task('watch', ['inject'], function () {

    gulp.watch([options.src + '/*.html', 'bower.json'], ['inject']);

    gulp.watch([
      options.src + '/app/**/*.css',
      options.src + '/app/**/*.scss'
    ], function(event) {
      if(isOnlyChange(event)) {
        gulp.start('styles');
      } else {
        gulp.start('inject');
      }
    });

    gulp.watch([options.src + '/app/**/*.js', options.src + '/assets/locales/locale-*.js'], function(event) {
      if(isOnlyChange(event)) {
        gulp.start('scripts');
      } else {
        gulp.start('inject');
      }
    });

    gulp.watch(options.src + '/app/**/*.html', function(event) {
      browserSync.reload(event.path);
    });
/*
    gulp.watch(options.src + '/app/environment-configs/environment.config.dev.js', function(event) {
      browserSync.reload(event.path);
    });
*/
    gulp.watch(options.src + '', function(event) {
      gulp.start('compileMock_API_Routes');
    });



    gulp.watch(['./src/app/config/app.config.json', './src/app/config/app.config.local.json', './src/app/config/routes.config.json'], function(event) {
      gulp.start('config:local');
    });
  });
};
