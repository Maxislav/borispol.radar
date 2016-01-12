module.exports = function (grunt) {

    var dateFormat = require('./dateFormat');
    // Задачи
    grunt.initConfig({
        // Склеиваем

        uglify: {
            dev: {
                options: {
                    sourceMap: true,
                    mangle: false
                },
                files: {
                    'build/scripts.min.js': [
                        "lib/jquery/jquery-min.js",
                       // "lib/jquery/jquery-ui-1.11.2.custom/jquery-ui.min.js",
                        "lib/jquery/jquery-ui-1.11.1/jquery-ui.min.js",
                        'js/app.js',
                        'js/timer.js',
                        'js/main.js',
                        'lib/jquery/dateFormat.js',
                        'js/moduleController.js',
                        'js/MathDate.js'
                    ]
                }
            },
            prod: {
                options: {
                    // sourceMap: true,
                    mangle: true
                },
                files: {
                    'build/scripts.min.js': [
                        "lib/jquery/jquery-min.js",
                        "lib/jquery/jquery-ui-1.11.2.custom/jquery-ui.min.js",
                        'js/app.js',
                        'js/timer.js',
                        'js/main.js',
                        'lib/jquery/dateFormat.js',
                        'js/moduleController.js',
                        'js/MathDate.js'
                    ]
                }
            }

        },
        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2,
                    sourceMap: false
                    /*sourceMap: true,
                     sourceMapFilename: 'css/css.min.css.map',
                     sourceMapRootpath: '../'*/
                },
                files: {
                    "module/home/home.css": [
                        "module/home/home.less"
                    ],
                    "module/iredMet/iredMet.css": [
                        "module/iredMet/iredMet.less"
                    ],
                    "module/helpme/helpme.css": [
                        "module/helpme/helpme.less"
                    ],
                    "module/dopa/dopa.css": [
                        "module/dopa/dopa.less"
                    ],
                    "module/forecast/forecast.css": [
                        "module/forecast/forecast.less"
                    ]
                }
            },
            styleMain: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2,
                    sourceMap: false
                    /*sourceMap: true,
                     sourceMapFilename: 'css/css.min.css.map',
                     sourceMapRootpath: '../'*/
                },
                files: {
                    "css/css.css": [
                        "lib/bootstrap/dist/css/bootstrap.min.css",
                        "css/borispol.less"

                    ]
                }
            }
        },
        'string-replace': {
            index: {
                files: {
                    'index.html': 'index.html'
                },
                options: {
                    replacements: [
                        {
                            pattern: /js\/init.js\?v=[^"]+/,
                            replacement: function () {
                                return 'js/init.js?v=' + dateProd('-')
                            }
                        },
                        {
                            pattern: /name\=\"release\"\>[^\<]+/,
                            replacement: function () {
                                return 'name="release">' + dateProd()
                            }
                        }

                    ]
                }
            },
            app: {
                files: {
                    'js/init.js': 'js/init.js'
                },
                options: {
                    replacements: [
                        {
                            pattern: /bust=[^"]+/,
                            replacement: function () {
                                return 'bust=' + dateProd('-')
                            }
                        }
                    ]
                }
            }
        },

        watch: {
            styles: {
                // Which files to watch (all .less files recursively in the less directory)
                files: [
                    "module/home/home.less",
                    "css/borispol.css",
                    "css/main.less",
                    "module/iredMet/iredMet.less",
                    "module/helpme/helpme.less",
                    "module/dopa/dopa.less",
                    "module/forecast/forecast.less"
                ],
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            },
            styleMain: {
                files: [
                    "css/borispol.less"
                ],
                tasks: ['less:styleMain'],
                options: {
                    nospawn: true
                }
            },
            js: {
                files: [
                    "lib/jquery/jquery-min.js",
                    'js/app.js',
                    'js/timer.js',
                    'js/main.js',
                    'lib/jquery/dateFormat.js',
                    'js/moduleController.js',
                    'js/MathDate.js'
                ],
                tasks: ['uglify:dev'],
                options: {
                    nospawn: true
                }
            }
        }
    });

    function dateProd(string) {
        string = string||' '
        var date = dateFormat.format.date( new Date(), 'dd.MM.yyyy'+string+'HH:mm:ss')
        return date;
    }


   /* function dateProd() {
        var d = new Date()
        return d.getFullYear() + '.' + (d.getMonth() + 1) + '.' + d.getDate() + '-' +
            d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    }*/

    // Загрузка плагинов, установленных с помощью npm install
    grunt.loadNpmTasks('grunt-contrib-uglify');//
    grunt.loadNpmTasks('grunt-contrib-less');//
    grunt.loadNpmTasks('grunt-contrib-watch');//
    grunt.loadNpmTasks('grunt-string-replace');

    // Задача по умолчанию
    grunt.registerTask('default', ['uglify:dev', 'less', 'watch' ]);
    grunt.registerTask('prod', ['uglify:prod', 'less', 'string-replace']);
    //grunt.registerTask('test', ['uglify']);

};