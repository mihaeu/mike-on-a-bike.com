/*global module:false*/
module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({

    // basic properties
    // projectDir: '../..',
    projectDir: '.',
    themeDir: '<%= projectDir %>/themes/moab',
    assetDir: '<%= themeDir %>/assets',
    bowerDir: '<%= themeDir %>/bower_components',
    outputDir: '<%= projectDir %>/output',
    resourceDir: '<%= projectDir %>/resources',

    uglify: {
      dist: {
        src: [
          '<%= bowerDir %>/jquery/jquery.js',
          '<%= bowerDir %>/jquery-jsonp/src/jquery.jsonp.js',
          '<%= bowerDir %>/nanoGALLERY/jquery.nanogallery.js'
        ],
        dest: '<%= assetDir %>/js/scripts.min.js'
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
      odin: {
        files: [
          '<%= resourceDir %>/**/*.md',
          '<%= projectDir %>/config.yml',
          '<%= themeDir %>/*.twig'
        ],
        tasks: ['shell:develop']
      },
      css: {
        files: '<%= assetDir %>/**/*.less',
        tasks: ['recess', 'shell:develop']
      },
      js: {
        files: '<%= assetDir %>/**/*.js',
        tasks: ['uglify', 'shell:develop']
      }
    },
    recess: {
      dist: {
        options: {
          compile: true,
          compress: true
        },
        files: {
          '<%= assetDir %>/css/styles.min.css': [
            '<%= assetDir %>/less/styles.less'
          ]
        }
      }
    },
    uncss: {
      dist: {
        files: {
          '<%= assetDir %>/css/styles.min.css': ['<%= outputDir %>/**/*.html']
        }
      }
    },
    shell: {
      develop: {
        options: {
          stdout: true
        },
        command: 'php <%= projectDir %>/odin generate --dir="<%= projectDir %>" --title=DEVELOP'
      },
      production: {
        options: {
          stdout: true
        },
        command: 'php <%= projectDir %>/odin generate --dir="<%= projectDir %>" --url="http://mike-on-a-bike.com"'
      }
    },
    connect: {
      server: {
        options: {
          port: 8080,
          base: '<%= outputDir %>'
        }
      }
    },

    sprite: {
      featured: {
        engine: 'gm',
        cssFormat: 'css',
        src: '<%= assetDir %>/img/featured/*.jpg',
        destImg: '<%= assetDir %>/img/featured.jpg',
        destCSS: '<%= assetDir %>/less/sprites.less'
      },
      imgOpts: {
         'quality': 100
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
  grunt.loadNpmTasks('grunt-spritesmith');


  grunt.registerTask('default', ['jshint', 'recess', 'uglify', 'shell:develop']);
  grunt.registerTask('serve', ['connect', 'watch']);

};

