module.exports = function(grunt) {

  grunt.initConfig({
    // remove all files from yaml folder
    clean: ['yaml'],

    // compile YAML build
    compass: {
      build: {
        options: {
          sassDir        : 'sass/static-build',
          cssDir         : 'yaml',
          importPath     : 'sass',
          imagesDir      : 'yaml',
          outputStyle    : 'expanded',
          noLineComments : true
        }
      },
      docs: {
        options: {
          sassDir        : 'sass/docs',
          cssDir         : 'docs',
          importPath     : 'sass',
          imagesDir      : 'yaml',
          outputStyle    : 'expanded',
          noLineComments : true
        }
      },
      css: {
        options: {
          sassDir        : 'sass/css',
          cssDir         : 'css',
          importPath     : 'sass',
          imagesDir      : 'yaml',
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
      },
      microformatsImgPath: {
        files: {
          './': 'yaml/add-ons/microformats/*.css'
        },
        options: {
          replacements: [{
              pattern     : /\/yaml\/add-ons\/microformats\//ig,
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

    copy: {
      main: {
        files: [
          {expand: true, cwd: 'sass/yaml-sass/', src: ['**/*.js'], dest: 'yaml/'}, // makes all src relative to cwd
          {expand: true, cwd: 'sass/yaml-sass/', src: ['**/*.png', '**/*.gif', '**/*.jpg'], dest: 'yaml/'} // makes all src relative to cwd
        ]
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
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['clean', 'copy', 'compass:css', 'compass:docs']);
  grunt.registerTask('build',  ['clean', 'copy', 'compass', 'string-replace', 'cssmin']);
};
