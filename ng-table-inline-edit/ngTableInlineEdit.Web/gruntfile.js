module.exports = function (grunt) {

    // Configurable paths for the application
    var appConfig = {
        mainLoc: 'app/main',
        mainConcatFile: 'main',
        dataLoc: 'app/data',
        dataConcatFile: 'data'
    };

    grunt.initConfig({
        //imports the JSON metadata stored in package.json into the grunt config
        pkg: grunt.file.readJSON('package.json'),
        appSettings: appConfig,
        processhtml: {
            debug: {
                options: {
                    process: false,
                    data: {
                        message: 'This is development build'
                    }
                },
                files: {
                    'index.html': ['index.tpl.html']
                }
            },
            release: {
                options: {
                    process: false,
                    data: {
                        message: 'This is a release build'
                    }
                },
                files: {
                    'index.html': ['index.tpl.html']
                }
            }
        },
        bowerInstall: {
            debug: {
                // Point to the files that should be updated when 
                // you run `grunt bower-install` 
                src: [
                  'index.html'
                ],

                // Optional: 
                // --------- 
                cwd: '',
                dependencies: true,
                devDependencies: true,
                exclude: [],
                fileTypes: {},
                ignorePath: '',
                overrides: {
                    angular: {
                        main: "./angular.min.js"
                    },
                    jquery: {
                        main: 'dist/jquery.min.js'
                    },
                    'angular-bootstrap': {
                        main: './ui-bootstrap-tpls.min.js'
                    },
                    'angular-resource': {
                        main: './angular-resource.min.js'
                    },
                    'angular-ui-router': {
                        main: './release/angular-ui-router.min.js'
                    },
                    bootstrap: {
                        main: ['dist/css/bootstrap.min.css',
                            'dist/css/bootstrap-theme.min.css',
                            'dist/js/bootstrap.min.js']
                    }
                }
            },
            release: {
                // Point to the files that should be updated when 
                // you run `grunt bower-install` 
                src: [
                  'index.html'
                ],

                // Optional: 
                // --------- 
                cwd: '',
                dependencies: true,
                devDependencies: false,
                exclude: [],
                fileTypes: {},
                ignorePath: '',
                overrides: {
                    angular: {
                        main: "./angular.min.js"
                    },
                    jquery: {
                        main: 'dist/jquery.min.js'
                    }
                }
            }
        },
        jshint: {
            beforeconcat:{
                options: {
                    reporter: 'checkstyle',
                    reporterOutput: 'app/<%= pkg.name %>.before.jshint.output.xml'
                },
                files: {
                    src: ['gruntfile.js', 'bower.json', 'package.json', '<%= appSettings.mainLoc %>/**/*.js', '<%= appSettings.dataLoc %>/**/*.js']
                },
            },
            afterconcat:{
                options: {
                    reporter: 'checkstyle',
                    reporterOutput: 'app/<%= pkg.name %>.after.jshint.output.xml'
                },
                files: {
                    src: ['app/<%= pkg.name %>.<%= appSettings.mainConcatFile %>.js', 'app/<%= pkg.name %>.<%= appSettings.dataConcatFile %>.js']
                },
            }
        },
        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: ' ',
                sourceMap: false
            },
            main: {
                // the files to concatenate
                src: [
                    '<%= appSettings.mainLoc %>/main-app.mdl.js',
                    '<%= appSettings.mainLoc %>/**/*.js'],
                // the location of the resulting JS file
                dest: 'app/<%= pkg.name %>.<%= appSettings.mainConcatFile %>.js'
            },
            data: {
                // the files to concatenate
                src: [
                    '<%= appSettings.dataLoc %>/data-app.mdl.js',
                    '<%= appSettings.dataLoc %>/**/*.js'],
                // the location of the resulting JS file
                dest: 'app/<%= pkg.name %>.<%= appSettings.dataConcatFile %>.js'
            }
        },
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            mainApp: {
                files: {
                    'app/<%= pkg.name %>.<%= appSettings.mainConcatFile %>.js': ['app/<%= pkg.name %>.<%= appSettings.mainConcatFile %>.js']
                }
            },
            dataApp: {
                files: {
                    'app/<%= pkg.name %>.<%= appSettings.dataConcatFile %>.js': ['app/<%= pkg.name %>.<%= appSettings.dataConcatFile %>.js']
                }
            }
        },
        watch: {
            watchScripts: {
                files: ['<%= appSettings.mainLoc %>/main-app.mdl.js', '<%= appSettings.mainLoc %>/**/*.js'],
                tasks: ['jshint:beforeconcat', 'concat', 'jshint:afterconcat']
            },
            watchHtml: {
                files: ['index.tpl.html'],
                tasks: ['processhtml:debug', 'bowerInstall:debug']
            }
        }
    });

    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-bower-install');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-watch');

    //Note: Even though default task uses concat the concatinated files are not used [to support debugging]. It's being concatinated to identify bugs early. 
    grunt.registerTask('default', ['processhtml:debug', 'bowerInstall:debug', 'jshint:beforeconcat', 'concat', 'jshint:afterconcat', 'ngAnnotate', 'watch']);

    //TODO: Write release config
    grunt.registerTask('release', ['processhtml:release', 'bowerInstall:release']);
};