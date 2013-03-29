module.exports = function(grunt) {

  grunt.initConfig({
    clean: ['yaml'],

    compass: {
      dist: {
        options: {
          sassDir        : 'sass/yaml',
          cssDir         : 'yaml',
          importPath     : 'sass',
          outputStyle    : 'expanded',
          noLineComments : true
        }
      }
    },

    'string-replace': {
      stripCharset: {
        files: {
          './': 'yaml/**/*.css'
        },
        options: {
          replacements: [{
              pattern     : /@charset "utf-8";/ig,
              replacement : ''
            }]
        }
      }
    },

    cssmin: {
      compress: {
        files: [{
          expand : true,           // Enable dynamic expansion.
          cwd    : 'yaml/',        // Src matches are relative to this path.
//          src    : ['**/*.css'],   // Actual pattern(s) to match.
          src    : ['core/*.css','add-ons/rtl-support/core/*.css'],   // Actual pattern(s) to match.
          dest   : 'yaml/',        // Destination path prefix.
          ext    : '.min.css'      // Dest filepaths will have this extension.
        }]
      }
    },

    watch: {
      files: '<%= compass.dist.options.sassDir %>/**/*.scss',
      tasks: 'compass'
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-string-replace');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['clean', 'compass']);
  grunt.registerTask('minify',  ['clean', 'compass', 'string-replace', 'cssmin']);

};
