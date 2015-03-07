module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    watch: {
      compass: {
        files : ['assets/styles/**/*.{scss,sass}'],
        tasks : ['compass:watch']
      },
      coffee: {
        files: ['assets/coffee/**/*.coffee'],
        tasks: ['coffee:dist']
      },
    },
    compass: {
      options: {
        sassDir : 'assets/styles',
        cssDir  : 'public/styles'
      },
      dist: {},
      watch: {
        options: {
          sassDir : 'assets/styles',
          cssDir  : 'public/styles',
        },
      },
    },
    coffee: {
      dist: {
        files: [{
          expand : true,
          cwd    : 'assets/coffee',
          src    : '**/*.coffee',
          dest   : 'public/scripts',
          ext    : '.js'
        }]
      },
      test: {
        files: [{
          expand : true,
          cwd    : 'test/spec',
          src    : '**/*.coffee',
          dest   : '.tmp/spec',
          ext    : '.js'
        }]
      }
    }
  });

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('compile', ['compass:watch']);
}
