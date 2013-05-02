GruntJS-Example
===============


Overview
-------------------------------------------
This is an example project that uses GruntJS to concatenate the JavaScript and compile SASS files, plus watch for any changes.  The project has some basic instruction on how to install and get grunt working.

After you have installed Node + Grunt, you can follow the 'Setting up Grunt for an existing project' to get the project working.

Note this is build for Grunt version 0.4.1.


Installing NodeJS + Grunt
-------------------------------------------
1) Download NodeJS from http://nodejs.org/ and follow the installer’s instructions.
2) Run: sudo npm install -g grunt-cli


Setting up Grunt for a new project:
-------------------------------------------
1) Go to the projects folder root.  Run: cd /path/to/your/project
2) Run: sudo npm install grunt
3) Install any plugins (modules). These with instructions can be found here - http://gruntjs.com/plugins 
4) Make your 'package.json' file. See an example bellow.  
    - Note you can run 'npm init' to make a template file for you.
5) Make your 'Gruntfile.js' file. See an example bellow.  
6) To start grunt Run: grunt


Setting up Grunt for an existing project:
-------------------------------------------
Assuming the 'package.json' and 'Gruntfile.js' have already been created, you can install grunt and any dependencies in an automated way.

1) Go to the projects folders root.  Run: cd /path/to/your/project
2) Run: npm install
3) To start grunt Run: grunt


Versions
-------------------------------------------
Getting your NodeJS Version: node --version
Getting your Grunt Version: grunt --version


Uninstalling Grunt
-------------------------------------------
- Uninstalling 'grunt' globally: sudo npm uninstall -g grunt
- Uninstalling 'grunt-cli' globally: sudo npm uninstall -g grunt-cli


Uninstalling NodeJS
-------------------------------------------
1) Run: 'which node' 
2) The above will return something like /path/bin/node
3) Run: cd /path
4) rm -r bin/node bin/node-waf include/node lib/node lib/pkgconfig/nodejs.pc share/man/man1/node.1


Listing Modules
-------------------------------------------
- Listing all global modules. Run: npm list -g
- Listing all project modules. Run: npm list


Uninstalling Modules
-------------------------------------------
Run: sudo npm uninstall module_name


Examples - package.json
-------------------------------------------
- This example shows the basic setup of a package.json file.  
- The name and version fields are required.
- The devDependencies should list all the plugins / modules used.  This allows other developers to install these dependencies in a simple process (see Setting up Grunt for an existing project).
- More detail on the specifics of this file can be found at - https://npmjs.org/doc/json.html.  

```json
{
  "name": "your-project",
  "version": "0.1.0",
  "devDependencies": {
    "grunt": "~0.4.1",
    "grunt-contrib-concat": "~0.2.0",
    "grunt-contrib-sass": "~0.3.0",
    "grunt-contrib-watch": "~0.3.1",
    "grunt-contrib-uglify": "~0.2.0"
  }
}
```

Examples - Gruntfile.js
-------------------------------------------
- This example requires the plugins listed in devDependencies from the example package.json
- This example when run by default will automatially:
    1) concatinate any files listed in the concat src into one file.
    2) complile any sass files you have setup.
    3) watch the files listed and run the above when chnages are made.
- Indervidual tasks can be run by calling 'grunt YOUR TASK'. For example 'grunt uglify' will run the uglify task


`````javascript
module.exports = function(grunt) {
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        meta: {
            jsPath: 'deploy/public/assets/js/',
            cssPath: 'deploy/public/assets/css/',
            scssPath: 'deploy/public/assets/scss/'
        },
        concat: {
            dist: {
                src: [
                    '<%= meta.jsPath %>vendor/jquery-1.9.0.min.js',
                    '<%= meta.jsPath %>vendor/CSSPlugin.min.js',
                    '<%= meta.jsPath %>vendor/EasePack.min.js',
                    '<%= meta.jsPath %>vendor/TweenLite.min.js',
                    '<%= meta.jsPath %>vendor/jquery.cookie.js',
                    '<%= meta.jsPath %>ga.js',
                    '<%= meta.jsPath %>age-verification.js',
                    '<%= meta.jsPath %>game.js',
                    '<%= meta.jsPath %>game-won.js',
                    '<%= meta.jsPath %>game-lost.js',
                    '<%= meta.jsPath %>share-email.js',
                    '<%= meta.jsPath %>share-twitter.js',
                    '<%= meta.jsPath %>language-switch.js',
                    '<%= meta.jsPath %>tc.js',
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
                    '<%= meta.cssPath %>main.css': '<%= meta.scssPath %>main.scss',
                    '<%= meta.cssPath %>thanks.css': '<%= meta.scssPath %>thanks.scss'
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

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['concat', 'sass', 'watch']);
    grunt.registerTask('bundle', 'A task that bundles all dependencies.', function () {
        var pkg = grunt.file.readJSON('./package.json');
        pkg.bundledDependencies = Object.keys(pkg.dependencies);
        grunt.file.write('./package.json', JSON.stringify(pkg, undefined, '  '));
    });
};
`````
