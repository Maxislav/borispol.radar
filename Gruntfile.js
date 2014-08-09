module.exports = function (grunt) {

    // Задачи
    grunt.initConfig({
        // Склеиваем

        uglify: {
            options: {
                //sourceMap: true
                mangle: false
            },
            main: {
                files: {
                    // Результат задачи concat
                    'build/scripts.min.js': [
                        "lib/jquery/jquery-min.js",
                        'js/app.js',
                        'js/timer.js',
                        'js/main.js',
                        'lib/jquery/dateFormat.js'
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
                        "css/borispol.less",
                        "lib/bootstrap/dist/css/bootstrap.min.css"
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
                    "module/helpme/helpme.less"
                ],
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            },
            styleMain: {
                files: [
                    "css/borispol.less",
                ],
                tasks: ['less:styleMain'],
                options: {
                    nospawn: true
                }
            }
        }

    });

    // Загрузка плагинов, установленных с помощью npm install
    grunt.loadNpmTasks('grunt-contrib-uglify');//
    grunt.loadNpmTasks('grunt-contrib-less');//
    grunt.loadNpmTasks('grunt-contrib-watch');//

    // Задача по умолчанию
    grunt.registerTask('default', ['less', 'watch' ]);
    grunt.registerTask('ms', ['less:styleMain', 'watch:styleMain']);

};