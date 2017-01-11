// Karma configuration
// Generated on Wed Jun 01 2016 16:15:34 GMT-0400 (EDT)

/*
 If karma encounters runtime errors you may need to install some of the following:
 bower install angular-mocks
 npm install angular-mocks
 npm install karma
 npm install karma-spec-reporter
 npm install karma-phantomjs-launcher
 npm install karma-jasmine
 npm install gulp-jasmine
 */

var wiredep = require('wiredep');
var bowerFiles = wiredep({devDependencies: true})['js'];

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        /*
         files: [

         {pattern: 'dist/scripts/vendor-149959ab.js', included: true},
         {pattern: 'bower_components/angular-mocks/angular-mocks.js', included: true},
         {pattern: 'dist/scripts/app-2d5a11de.js', included: true},
         {pattern: 'src/test/spec/unit_tests/testspec.js', included: true}
         ],
         */
        files: bowerFiles.concat([
            'src/app/bootstrap/index.module.js',
            'src/app/features/services/*.js',
            'src/app/utils/**/*.js',
            'src/app/features/components/**/*.js',
            'src/test/spec/unit_tests/mocks/*.mock.js',
            //use below line to enable all test specs.
            'src/test/spec/unit_tests/**/*.spec.js',
/*
            'src/test/spec/unit_tests/advisorDetailService.spec.js',
            'src/test/spec/unit_tests/branchDetailService.spec.js',
            'src/test/spec/unit_tests/branchDetailComponent.spec.js',
            'src/test/spec/unit_tests/advisorDetailComponent.spec.js',


            'src/test/spec/unit_tests/removeDiacriticsService.spec.js',
            'src/test/spec/unit_tests/advisorListService.spec.js',
            'src/test/spec/unit_tests/langFilterService.spec.js',
            'src/test/spec/unit_tests/provinceFilterService.spec.js',
            'src/test/spec/unit_tests/filterRunnerService.spec.js'

            /*
                './src/app/bootstrap/index.module.js',
                'src/test/spec/unit_tests/testspec.js',
                'src/app/features/services/branchDetail.service.js',
                'src/test/spec/unit_tests/branchDetailServiceSpec.js',
                'src/app/features/services/advisorDetail.service.js',
                'src/test/spec/unit_tests/advisorDetailServiceSpec.js',
                'src/app/features/components/branchDetail/branchDetail.component.js',
                'src/test/spec/unit_tests/branchDetailComponentSpec.js',
                'src/app/features/components/advisorDetail/advisorDetail.component.js',
                'src/test/spec/unit_tests/advisorDetailComponentSpec.js'
                */

        ]),


        // list of files to exclude
        exclude: [
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],
        plugins : [
            'karma-jasmine',
            'karma-chrome-launcher'
        ],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
}
