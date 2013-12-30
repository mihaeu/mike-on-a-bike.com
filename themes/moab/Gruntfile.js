/*global module:false*/
module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({

    uglify: {
      dist: {
        src: ['bower_components/jquery/jquery.js'],
        dest: 'assets/js/scripts.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
          eqeqeq: true,
          immed: true,
          latedef: true,
          newcap: true,
          noarg: true,
          sub: true,
          undef: true,
          unused: true,
          boss: true,
          eqnull: true,
          browser: true,
          globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
          tasks: ['jshint:gruntfile']
      },
      odin: {
        files: [
          '../../resources/**/*.md',
          '../../config.yml',
          '**/*.twig'
        ],
        tasks: ['shell:generate']
      },
      css: {
        files: 'assets/**/*.less',
        tasks: ['recess', 'shell:generate']
      },
      js: {
        files: 'assets/**/*.js',
        tasks: ['uglify', 'shell:generate']
      }
    },
    recess: {
      dist: {
        options: {
          compile: true,
          compress: true
        },
        files: {
          'assets/css/styles.min.css': [
            'assets/less/styles.less'
          ]
        }
      }
    },
    uncss: {
      dist: {
        files: {
          'assets/css/styles.min.css': ['../../output/**/*.html']
        }
      }
    },
    shell: {
      generate: {
        options: {
          stdout: true
        },
        command: 'php ../../odin generate --dir=/opt/lampp/htdocs/mike-on-a-bike.com'
      }
    },
    connect: {
      server: {
        options: {
          port: 8080,
          base: '../../output'
        }
      }
    },
    notify: {
      recess: {
        options: {
          title: 'Task Complete',  // optional
          message: 'SASS and Uglify finished running', //required
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-recess');
  grunt.loadNpmTasks('grunt-uncss');

  grunt.registerTask('default', ['jshint', 'recess', 'uglify', 'shell:generate']);
  grunt.registerTask('serve', ['connect', 'watch']);

};

