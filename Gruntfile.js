module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        meta: {
            srcPath: 'src/',

            jsSrcPath: 'deploy/assets/js/',
            jsDeployPath: 'deploy/assets/js-min/',
            
            scssPath: 'deploy/assets/scss/',
            cssPath: 'deploy/assets/css/',

            imgSrcPath: 'deploy/assets/imgs/icons/',
            imgDeployPath: 'deploy/assets/imgs/'
        },

        concat: {
            dist: {
                src: [
                    '<%= meta.jsSrcPath %>vendor/jquery-1.9.0.min.js',
                    '<%= meta.jsSrcPath %>vendor/CSSPlugin.min.js',
                    '<%= meta.jsSrcPath %>vendor/EasePack.min.js',
                    '<%= meta.jsSrcPath %>vendor/TweenLite.min.js',
                    '<%= meta.jsSrcPath %>main.js'
                ],
                dest: '<%= meta.jsDeployPath %>main-min.js'
            }
        },

        uglify: {
            my_target: {
                files: {
                    '<%= meta.jsDeployPath %>main-min.js': ['<%= meta.jsPath %>main-min.js']
                }
            }
        },

        sass: {
            dist: {
                files: {
                    '<%= meta.cssPath %>main.css': '<%= meta.scssPath %>main.scss'
                }
            }
        },

        compass: {
            dist: {
                options: {
                    config: 'config/config.rb',
                    sassDir: '<%= meta.scssPath %>',
                    cssDir: '<%= meta.cssPath %>',
                    imagesDir: '<%= meta.imgDeployPath %>',
                    noLineComments: true
                }
            }
        },

        watch: {
            files: [
                '<%= meta.jsSrcPath %>/*',
                '<%= meta.scssPath %>/*'
                ],
            tasks: ['default']
        }

    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['concat', 'compass', 'watch']);
    grunt.registerTask('bundle', 'A task that bundles all dependencies.', function () {
        // "package" is a reserved word so it's abbreviated to "pkg"
        var pkg = grunt.file.readJSON('./package.json');
        // set the bundled dependencies to the keys of the dependencies property
        pkg.bundledDependencies = Object.keys(pkg.dependencies);
        // write back to package.json and indent with two spaces
        grunt.file.write('./package.json', JSON.stringify(pkg, undefined, '  '));
    });
};