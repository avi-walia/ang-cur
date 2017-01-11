'use strict';

var gulp = require('gulp');
var bump = require('gulp-bump');
var gulpNgConfig = require('gulp-ng-config');
var fs = require('fs');
var jsonMerge = require('gulp-merge-json');
var runSequence = require('run-sequence');
var cleanCSS = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var angularProtractor = require('gulp-angular-protractor');
var clean = require('gulp-clean');
var rename = require("gulp-rename");
var inject = require('gulp-inject-string');
var regexReplace = require('gulp-regex-replace');



var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

// Setting up the test task
gulp.task('protractor', function(callback) {
    gulp
        .src(['src/app/test/spec/e2e/*.js'])
        .pipe(angularProtractor({
            'configFile': 'protractor.conf.js',
            'debug': false,
            'autoStartStopServer': true
        }))
        .on('error', function(e) {
            console.log(e);
        })
        .on('end', callback);
});


module.exports = function (options) {
    gulp.task('partials', function () {
        return gulp.src([
            options.src + '/app/**/*.html',
            options.tmp + '/serve/app/**/*.html'
        ])
            .pipe(htmlmin({
                collapseWhitespace: true
            }))
            /*.pipe($.minifyHtml({
             empty: true,
             spare: true,
             quotes: true
             }))*/
            .pipe($.angularTemplatecache('templateCacheHtml.js', {
                module: options.app,
                root: 'app'
            }))
            .pipe(gulp.dest(options.tmp + '/partials/'));
    });

    gulp.task('html', ['inject', 'partials'], function () {
        var partialsInjectFile = gulp.src(options.tmp + '/partials/templateCacheHtml.js', {read: false});
        var partialsInjectOptions = {
            starttag: '<!-- inject:partials -->',
            ignorePath: options.tmp + '/partials',
            addRootSlash: false
        };

        var htmlFilter = $.filter('*.html');
        var jsFilter = $.filter('**/*.js');
        var cssFilter = $.filter('**/*.css');
        var assets;

        return gulp.src(options.tmp + '/serve/*.html')
            .pipe($.inject(partialsInjectFile, partialsInjectOptions))
            .pipe(assets = $.useref.assets())
            .pipe($.rev())
            .pipe(jsFilter)
            //.pipe($.stripDebug()) // remove any debug/console
            //.pipe($.stripNgLog()) // remove any $log
            .pipe($.ngAnnotate())
            .pipe($.uglify({preserveComments: $.uglifySaveLicense})).on('error', options.errorHandler('Uglify'))
            .pipe(jsFilter.restore())
            .pipe(cssFilter)
            //.pipe($.csso())
            .pipe(cleanCSS({processImport:false}))
            .pipe(cssFilter.restore())
            .pipe(assets.restore())
            .pipe($.useref())
            .pipe($.revReplace())
            .pipe(htmlFilter)
            .pipe(htmlmin({
                collapseWhitespace: true
            }))
            /*.pipe($.minifyHtml({
             empty: true,
             spare: true,
             quotes: true,
             conditionals: true
             }))*/
            .pipe(htmlFilter.restore())
            .pipe(gulp.dest(options.dist + '/'))
            .pipe($.size({title: options.dist + '/', showFiles: true}));
    });

    // Only applies for fonts from bower dependencies
    // Custom fonts are handled by the "other" task

    //gulp.task('fonts', function () {
    //    return gulp.src($.mainBowerFiles())
    //        .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
    //        .pipe($.flatten())
    //        .pipe(gulp.dest(options.dist + '/fonts/'));
    //});


    gulp.task('fonts', function () {
        return gulp.src([
            'bower_components/**/*',
            '!' + options.src + '/**/*.{html,css,js,scss}'
        ])
            .pipe($.flatten())
            .pipe(gulp.dest(options.dist + '/fonts/'));
    });

    gulp.task('other', function () {
        return gulp.src([
            options.src + '/**/*',
            '!' + options.src + '/**/*.{html,css,js,scss,mock.json}',
            '!' + options.src + '/app/config/*.json'
        ])
            .pipe(gulp.dest(options.dist + '/'));
    });


    gulp.task('locales', function () {
        return gulp.src([options.src + '/assets/locales/*.js'])
            .pipe($.uglify({mangle: false}))
            .pipe(gulp.dest(options.dist + '/assets/locales/'));
    });
    gulp.task('cleanTmp', function () {
        return gulp.src('./.tmp/')
            .pipe(clean());
    });
    /*
     gulp.task('envConfigs', ['cleanTmp'], function () {
     return gulp.src('./src/environment-configs/app.config.local.json')
     .pipe(rename("environment-config.json"))
     .pipe(gulp.dest('./.tmp/serve/locator'));
     });
     */
    /*
     gulp.task('translations', ['cleanTmp'], function() {
     return gulp.src('www/index.html')
     //.pipe(replace('<script src="environment.config.js">', '<script><?php echo file_get_contents("./environment.config.js");?>'))
     .pipe(replace({regex:/\benTranslationsStart(.|\r|\n)*\benTranslationsEnd/, '<script><?php echo file_get_contents("./environment.config.js");?>')))
     .pipe(rename('index.php'))
     .pipe(gulp.dest(options.dist));
     });
     */
    gulp.task('clean-build', function (done) {
        $.del([options.dist + '/', options.tmp + '/'], done);
    });

    gulp.task('clean-dist', function (done) {
        $.del([options.dist + '/app/', options.tmp + '/'], done);
        console.timeEnd("Build");
    })

    //bump
    //     return gulp.src(["./src/app/config.json"])
    gulp.task("bump:patch", function () {
        return gulp.src(["./bower.json", "./package.json"])
            .pipe(bump({type: "patch"}))
            .pipe(gulp.dest("./"));
    });

    gulp.task("bump:minor", function () {
        return gulp.src(["./bower.json", "./package.json"])
            .pipe(bump({type: "minor"}))
            .pipe(gulp.dest("./"));
    });

    gulp.task("bump:major", function () {
        return gulp.src(["./bower.json", "./package.json"])
            .pipe(bump({type: "major"}))
            .pipe(gulp.dest("./"));
    });


    //--config local (does not increment version number)
    gulp.task('config:local', function () {
        var pkg = JSON.parse(fs.readFileSync('./package.json'));

        gulp.src(['./src/app/config/app.config.json', './src/app/config/app.config.local.json', './src/app/config/routes.config.json'])
            .pipe(jsonMerge('config.json'))
            .pipe(gulpNgConfig(options.app, {
                createModule: false,
                constants: {
                    version: pkg.version + '(local)'
                },
                wrap: '(function () { \n  \'use strict\'; \nreturn <%= module %> \n})();'
            }))
            .pipe(gulp.dest('./src/app/config'))
    });

    //--config
    gulp.task('config', function () {
        var pkg = JSON.parse(fs.readFileSync('./package.json'));

        gulp.src(['./src/app/config/app.config.json', './src/app/config/routes.config.json'])
            .pipe(jsonMerge('config.json'))
            .pipe(gulpNgConfig(options.app, {
                createModule: false,
                constants: {
                    version: pkg.version + ''
                },
                wrap: '(function () { \n  \'use strict\'; \nreturn <%= module %> \n})();'
            }))
            .pipe(gulp.dest('./src/app/config'))
    });


    //--config dev
    gulp.task('config:dev', function () {
        var pkg = JSON.parse(fs.readFileSync('./package.json'));

        gulp.src(['./src/app/config/app.config.json', './src/app/config/app.config.dev.json', './src/app/config/routes.config.json'])
            .pipe(jsonMerge('config.json'))
            .pipe(gulpNgConfig(options.app, {
                createModule: false,
                constants: {
                    version: pkg.version + ' (dev)'
                },
                wrap: '(function () { \n  \'use strict\'; \nreturn <%= module %> \n})();'
            }))
            .pipe(gulp.dest('./src/app/config'))
    });

    //--config test
    gulp.task('config:test', function () {
        var pkg = JSON.parse(fs.readFileSync('./package.json'));

        gulp.src(['./src/app/config/app.config.json', './src/app/config/app.config.test.json', './src/app/config/routes.config.json'])
            .pipe(jsonMerge('config.json'))
            .pipe(gulpNgConfig(options.app, {
                createModule: false,
                constants: {
                    version: pkg.version + ' (test)'
                },
                wrap: '(function () { \n  \'use strict\'; \nreturn <%= module %> \n})();'
            }))
            .pipe(gulp.dest('./src/app/config'))
    });

    //--config uat
    gulp.task('config:uat', function () {
        var pkg = JSON.parse(fs.readFileSync('./package.json'));

        gulp.src(['./src/app/config/app.config.json', './src/app/config/app.config.uat.json', './src/app/config/routes.config.json'])
            .pipe(jsonMerge('config.json'))
            .pipe(gulpNgConfig(options.app, {
                createModule: false,
                constants: {
                    version: pkg.version + ' (uat)'
                },
                wrap: '(function () { \n  \'use strict\'; \nreturn <%= module %> \n})();'
            }))
            .pipe(gulp.dest('./src/app/config'))
    });


    //--config ionic
    gulp.task('config:ionic', function () {
        var pkg = JSON.parse(fs.readFileSync('./package.json'));

        gulp.src(['./src/app/config/app.config.json', './src/app/config/app.config.ionic.json', './src/app/config/routes.config.json'])
            .pipe(jsonMerge('config.json'))
            .pipe(gulpNgConfig(options.app, {
                createModule: false,
                constants: {
                    version: pkg.version + ' (ionic)'
                },
                wrap: '(function () { \n  \'use strict\'; \nreturn <%= module %> \n})();'
            }))
            .pipe(gulp.dest('./src/app/config'))
    });


    //--config prod
    gulp.task('config:prod', function () {
        var pkg = JSON.parse(fs.readFileSync('./package.json'));

        gulp.src(['./src/app/config/app.config.json', './src/app/config/app.config.prod.json', './src/app/config/routes.config.json'])
            .pipe(jsonMerge('config.json'))
            .pipe(gulpNgConfig(options.app, {
                createModule: false,
                constants: {
                    version: pkg.version
                },
                wrap: '(function () { \n  \'use strict\'; \nreturn <%= module %> \n})();'
            }))
            .pipe(gulp.dest('./src/app/config'))
    });


    // build local doesn't make sense; you can't run it
    /*gulp.task('build:local', function() {
     runSequence('clean',
     'config:local',
     ['html', 'fonts', 'other', 'locales'],
     'cleanupdist');
     });*/
    function buildLocal() {
        console.time("Build");
        runSequence('clean-build',
            'config:local',
            ['html', 'fonts', 'other', 'locales'],
            'clean-dist');
    }
    gulp.task('build:local', function() {
        buildLocal();
    });
    gulp.task('buildSafe:local', ['protractor'], function() {
        buildLocal();
    });
    function buildDEV() {
        console.time("Build");
        runSequence('clean-build',
            'config:dev',
            ['html', 'fonts', 'other', 'locales'],
            'clean-dist');
    }
    function build() {
        console.time("Build");
        runSequence('clean-build',
            'config',
            ['html', 'fonts', 'other', 'locales'],
            'clean-dist', 'del-index');
    }
    function buildTEST() {
        console.time("Build");
        runSequence('clean-build',
            'config:test',
            ['html', 'fonts', 'other', 'locales'],
            'clean-dist');
    }

    gulp.task('convertToPHP', function() {
        gulp.src(options.dist + '/index.html')
            //.pipe(inject.replace('<script src="environment.config.js">', '<script><?php echo file_get_contents("./environment.config.js");?></script>'))
            .pipe(inject.replace('//Environment Configs', '<?php echo file_get_contents("./environment.config.js");?>'))
            .pipe(inject.replace('//English Verbiage', '<?php echo file_get_contents("./assets/locales/locale-en.js");?>'))
            .pipe(inject.replace('//French Verbiage', '<?php echo file_get_contents("./assets/locales/locale-fr.js");?>'))
            .pipe(rename('index.php'))
            .pipe(gulp.dest(options.dist));
    });
    gulp.task('copyLocals', function() {
        gulp.src(options.src + '/assets/locales/locale-*.js')
            .pipe(gulp.dest(options.dist));
    });
    /*
     gulp.task('injectLocals', function() {
     gulp.src('www/index.html')
     .pipe(inject.replace('<script src="environment.config.js">', '<script><?php echo file_get_contents("./environment.config.js");?>'))
     .pipe(rename('index.php'))
     .pipe(gulp.dest(options.dist));
     });
     */
    gulp.task('del-index', ['convertToPHP'], function (done) {
        $.del([options.dist + '/index.html'], done);
    });

    gulp.task('build', function() {
        build();
    });
    gulp.task('build:dev', function() {
        buildDEV();
    });
    gulp.task('build:test', function() {
        buildTEST();
    });

    gulp.task('buildSafe:dev', ['protractor'], function() {
        buildDEV();
    });
    function buildUAT() {
        console.time("Build");
        runSequence('clean-build',
            'bump:patch',
            'config:uat',
            ['html', 'fonts', 'other', 'locales'],
            'clean-dist');
    }

    gulp.task('build:uat', function() {
        buildUAT();
    });

    gulp.task('buildSafe:uat', ['protractor'], function() {
        buildUAT();
    });

    // copy bower components
    gulp.task('cbc', function () {
        return gulp.src("./bower_components/**/*")
            .pipe(gulp.dest("./www/lib"));
    });
    function buildIonic() {
        console.time("Build");
        runSequence('clean-build',
            'config:ionic',
            ['html', 'fonts', 'other', 'locales', 'cbc'],
            'clean-dist');
    }

    gulp.task('buildSafe:ionic', ['protractor'], function() {
        buildIonic();
    });
    gulp.task('build:ionic', function() {
        buildIonic();
    });

    gulp.task('build:prod', function() {
        console.time("Build");
        runSequence('clean-build',
            'bump:minor',
            'config:prod',
            ['html', 'fonts', 'other', 'locales'],
            'clean-dist');
    });


    /*gulp.task('build:local', ['html', 'fonts', 'other', 'locales', 'config:local', 'cleanupdist']);   // does not update app version
     gulp.task('build:dev', ['html', 'fonts', 'other', 'locales', 'config:dev', 'cleanupdist']);   // does not update app version
     gulp.task('build:uat', ['html', 'fonts', 'other', 'locales', 'config:uat', 'cleanupdist']);    // updates app patch version
     gulp.task('build:prod', ['html', 'fonts', 'other', 'locales', 'config:prod', 'cleanupdist']);  // updates app minor version
     */

};
