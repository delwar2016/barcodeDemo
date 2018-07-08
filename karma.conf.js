// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function (config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '',

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['mocha','requirejs' ],
        client: {
            mocha: {
                timeout: 5000 // set default mocha spec timeout
            }
        },

        // list of files / patterns to load in the browser
        files: [
            {pattern: '.tmp/scripts/templates.js', included: false},
            {pattern: 'node_modules/**/*.js', included: false},
            {pattern: 'app/bower_components/**/*.js', included: false},
            'test/app/test-main.js',
            {pattern: 'app/scripts/**/*.js', included: false},
            {pattern: 'test/app/**/*.spec.js', included: false}
        ],

        // list of files / patterns to exclude
        exclude: [
            'app/scripts/main.js'
        ],

        // web server port
        port: 8083,
        colors: true,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,

        // reporter types:
        // - dots
        // - progress (default)
        // - spec (karma-spec-reporter)
        // - junit
        // - growl
        // - coverage
        reporters: ['spec'],

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['Chrome'],

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true,
        concurrency: Infinity
    });
};
