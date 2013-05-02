module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        meta: {
            jsPath: 'deploy/assets/js/',
            cssPath: 'deploy/assets/css/',
            scssPath: 'deploy/assets/scss/'
        },

        concat: {
            dist: {
                src: [
                    '<%= meta.jsPath %>vendor/jquery-1.9.0.min.js',
                    '<%= meta.jsPath %>vendor/CSSPlugin.min.js',
                    '<%= meta.jsPath %>vendor/EasePack.min.js',
                    '<%= meta.jsPath %>vendor/TweenLite.min.js',
                    '<%= meta.jsPath %>main.js'
                ],
                dest: '<%= meta.jsPath %>main-min.js'
            }
        },

        uglify: {
            my_target: {
                files: {
                    '<%= meta.jsPath %>main-min.js': ['<%= meta.jsPath %>main-min.js']
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

        watch: {
            files: [
                '<%= meta.jsPath %>/*',
                '<%= meta.scssPath %>/*'
                ],
            tasks: ['default']
        }

    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['concat', 'sass', 'watch']);
    grunt.registerTask('bundle', 'A task that bundles all dependencies.', function () {
        // "package" is a reserved word so it's abbreviated to "pkg"
        var pkg = grunt.file.readJSON('./package.json');
        // set the bundled dependencies to the keys of the dependencies property
        pkg.bundledDependencies = Object.keys(pkg.dependencies);
        // write back to package.json and indent with two spaces
        grunt.file.write('./package.json', JSON.stringify(pkg, undefined, '  '));
    });
};