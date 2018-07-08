'use strict';
var LIVERELOAD_PORT = 35729;
var SERVER_PORT = 9000;
var path = require('path');
var moment=require('moment');

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            options: {
                nospawn: true,
                livereload: LIVERELOAD_PORT
            },
            jst: {
                files: [
                    '<%= yeoman.app %>/scripts/templates/*.ejs'
                ],
                tasks: ['jst']
            },
            compass: {
                files: ['<%= yeoman.app %>/styles/sass/{,*/}*.{scss,sass}'],
                tasks: ['compass:server']
            },
            livereload:{
                options: {
                    livereload: grunt.option('livereloadport') || LIVERELOAD_PORT
                },
                files: [
                    '<%= yeoman.app %>/*.html',
                    '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
                    '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                    '<%= yeoman.app %>/scripts/templates/*.{ejs}',
                    'test/spec/**/*.js'
                ]
            },
            express: {
                files:  [ 'server/{,*/}*.js' ],
                tasks:  [ "express:dev" ],
                options: {
                    spawn: false
                }
            }
        },
        express: {
            dev: {
                options: {
                    script: 'server/app.js',
                    port: SERVER_PORT,
                    debug: true
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:'+SERVER_PORT+'/index.html'
            }
        },
        clean: {
            dist: ['.tmp', 'dist', 'server_dist', 'archive'],
            server: '.tmp'
        },
        compass: {
            options: {
                sassDir: '<%= yeoman.app %>/styles/sass',
                cssDir: '<%= yeoman.app %>/styles',
                relativeAssets:true,
                force:true,
                noLineComments:true
            },
            server:{
                options: {
                    outputStyle:"expanded",
                    debugInfo:false
                }
            },
            dist:{
                options: {
                    environment: 'production',
                    outputStyle:"compressed",
                    debugInfo:false
                }
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: "<%= yeoman.app %>/scripts",
                    mainConfigFile: "<%= yeoman.app %>/scripts/main.js",
                    paths: {
                        jquery: "../bower_components/jquery/dist/jquery.min",
                        backbone: "../bower_components/backbone/backbone",
                        fastclick: "../bower_components/fastclick/lib/fastclick",
                        underscore: "../bower_components/lodash/dist/lodash.min",
                        'templates': '../../.tmp/scripts/templates'
                    },
                    name: 'main',
                    optimize: "uglify",
                    uglify: {
                        toplevel: true,
                        ascii_only: true,
                        beautify: true,
                        max_line_length: 1000,

                        //How to pass uglifyjs defined symbols for AST symbol replacement,
                        //see "defines" options for ast_mangle in the uglifys docs.
                        defines: {
                            DEBUG: ['name', 'false']
                        },

                        //Custom value supported by r.js but done differently
                        //in uglifyjs directly:
                        //Skip the processor.ast_mangle() part of the uglify call (r.js 2.0.5+)
                        no_mangle: true
                    },
                    out: '.tmp/scripts/main.js'
                }
            }
        },
        useminPrepare: {
            html: '<%= yeoman.app %>/*.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css:['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options:{
                dirs: ['<%= yeoman.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/styles/main.css':[
                        '.tmp/styles/{,*/}*.css',
                        '<%= yeoman.app %>/styles/{,*/}*.css'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    src: '*.html',
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
    copy: {
        dist: {
            files: [{
                expand: true,
                dot: true,
                cwd: '<%= yeoman.app %>',
                dest: '<%= yeoman.dist %>',
                src: [
                    '*.{ico,txt}',
                    'images/{,*/}*.{webp,gif}',
                    'styles/fonts/{,*/}*.*',
                    'scripts/vendor/{,*/}*.*',
                    'locales/{,*/}*.*',
                ]
            },
            {
                src: '.tmp/scripts/main.js',
                dest: '<%= yeoman.dist %>/scripts/main.js'
            },
            {
                expand: true,
                dot: true,
                cwd: 'server',
                dest: 'server_dist',
                src: [
                    'api/{,*/}*.*',
                    'models/*.*',
                    'config/express.js',
                    'config/environment/{production,index}.js',
                    'routes/{,*/}*.*',
                    '*.js'
                ]
            }]
        }
    },
    jst: {
        options: {
            amd: true
        },
        compile: {
            files: {
                '.tmp/scripts/templates.js': ['<%= yeoman.app %>/scripts/templates/*.ejs']
            }
        }
    },
    rev: {
        dist: {
            files: {
                src: [
                    '<%= yeoman.dist %>/scripts/{,*/}*.js',
                    '<%= yeoman.dist %>/styles/{,*/}*.css',
                    '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                    '<%= yeoman.dist %>/styles/fonts/{,*/}*.*'
                ]
            }
        }
    },
    manifest: {
        generate: {
            options: {
                basePath: '<%= yeoman.dist %>',
                cache: ['index.html', 'offline.html'],
                network: ['http://*', 'https://*'],
                fallback: ['/offline.html'],
                preferOnline: true,
                verbose: true,
                timestamp: true,
                hash: true,
                master: ['index.html']
            },
            src: [
                'images/**/*.{jpg,png}',
                'scripts/*.js',
                'styles/*.css'
            ],
            dest: '<%= yeoman.dist %>/offline.appcache'
        }
    },
    compress: {
        main: {
            options: {
                archive: function () {
                    var date=moment().format("YYYY-MM-DD");
                    return 'archive/' + date + '.zip'
                },
                mode: 'zip'
            },
            files: [
                {expand: true, src: ['dist/**','server_dist/**','package.json','bower.json','pm2.json']}
            ]
        }
    },
    upload_file: {
        "test": {
            src: ['archive/*.zip'],
            options: {
                url: 'http://uploadservice/upload',
                method: 'POST',
                qs: {
                    'gray':true,//true(default):for test server;false:for official servers;
                    'rollback':false,//true(default):backup for rollback;false:don't backup;
                    'autoPublish': true,//true(default):auto run scripts;false:manual run scripts;
                    'wholePackage': true,//false(default):only patch;true:full package(rm the old one);
                    'production': 'BarcodeDemo',//project name
                    'npmUpdated': false,//true:npm install --production;false(default):nothing;
                    "pm2Script":false//true:pm2 startOrRestart pm2.json;false(default):nothing;
                }
            }
        },
    },
    // Test settings
    karma: {
        unit: {
            configFile: 'karma.conf.js',
            singleRun: true
        }
    },
    mochaTest: {
        options: {
            reporter: 'spec',
            timeout: 5000 // set default mocha spec timeout
        },
        unit: {
            src: ['test/server/*.spec.js']
        }
    }
});

    grunt.registerTask('createDefaultTemplate', function () {
        grunt.file.write('.tmp/scripts/templates.js', 'this.JST = this.JST || {};');
    });

    grunt.registerTask('server', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve' + (target ? ':' + target : '')]);
    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open:server']);
        }

        grunt.task.run([
            'clean:server',
            'createDefaultTemplate',
            'jst',
            'compass:server',
            'express:dev',
            'open:server',
            'watch'
        ]);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'createDefaultTemplate',
        'jst',
        'compass:dist',
        'requirejs',
        'useminPrepare',
        'imagemin',
        'htmlmin',
        'concat',
        'cssmin',
        'uglify',
        'copy',
        'rev',
        'usemin',
        'manifest'
    ]);
    grunt.registerTask('test', [
        'jst',
        'karma',
        'mochaTest'
    ]);
    grunt.registerTask('upload', [
        'compress',
        'upload_file:test'
    ]);
};
