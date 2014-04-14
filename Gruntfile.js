/*global module:false*/
module.exports = function (grunt) {
  grunt.initConfig({

    /*********************************************
     * Config properties
     *********************************************/
    projectDir: '.',
    // projectDir: '../..',
    themeDir: '<%= projectDir %>/themes/clean',
    assetDir: '<%= themeDir %>/assets',
    bowerDir: '<%= themeDir %>/bower_components',
    outputDir: '<%= projectDir %>/output',
    resourceDir: '<%= projectDir %>/resources',


    /*********************************************
     * Javascript related tasks
     *********************************************/
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


    /*********************************************
     * Design related tasks (CSS, images, sprites)
     *********************************************/
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

    /*********************************************
     * Development workflow (connect, watch, open)
     *********************************************/
    shell: {
      develop: {
        options: {
          stdout: true
        },
        command: 'php <%= projectDir %>/odin generate --dir="<%= projectDir %>" --title=mike-on-a-bike'
      },
      production: {
        options: {
          stdout: true
        },
        command: 'php <%= projectDir %>/odin generate --dir="<%= projectDir %>" --url="http://mike-on-a-bike.com"'
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
          '<%= themeDir %>/**/*.twig'
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
    connect: {
      server: {
        options: {
          port: 8088,
          base: '<%= outputDir %>'
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
  grunt.loadNpmTasks('grunt-spritesmith');

  // shorter than running ./odin generate
  grunt.registerTask('default', ['shell:develop']);
  grunt.registerTask('serve', ['connect', 'watch']);

  grunt.registerTask('dev', ['jshint', 'recess', 'uglify', 'shell:develop']);
  grunt.registerTask('production', ['jshint', /*'spritesmith',*/ 'recess', 'uglify', 'uncss', 'shell:production']);

};