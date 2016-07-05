module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      options: {
        'no-write': false //toggle for what if scenario testing
      },
      dist: ['dist/*']
    },
    copy: { /* Copy css files to dist directory */
      css: {
        files: [
          {expand: true, cwd: 'src', src: ['styles/*'], dest: 'dist/'}
        ],
      }
    },
    processhtml: {
      dist: {
        files: {
          'dist/index.html': ['src/index.html']
        }
      },
    },
    sass: {
      development: {
        files: [{
          expand: true,
          cwd: 'src/sass',
          dest: 'src/styles',
          src: ['*.scss'],
          ext: '.css'
        }]
      }
    },
    jshint: { /* syntax check the javascript files */
      // define the files to lint
      files: ['Gruntfile.js', 'src/scripts/*.js', '!src/scripts/dragscroll-custom.js'],
      // configure JSHint (documented at http://www.jshint.com/docs/)
      options: {
        // more options here if you want to override JSHint defaults
        browser: true,

        globals: {
          jQuery: true,
          console: true,
          module: true,
          requirejs: true,
          require: true
        }
      }
    },
    watch: {
      less: {
        files: 'src/sass/*.scss',
        tasks: ['sass']
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: "src/scripts/",
          name: "main",
          mainConfigFile: "src/scripts/main.js",
          out: "dist/scripts/main.js"
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  // Default task(s).
  grunt.registerTask('default', ['clean', 'sass', 'jshint', 'requirejs', 'copy', 'processhtml']);
  //grunt.registerTask('clean');
};
