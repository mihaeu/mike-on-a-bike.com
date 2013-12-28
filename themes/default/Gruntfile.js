/*global module:false*/
module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({

  uglify: {
    dist: {
      src: ['bower_components/jquery/jquery.js', 'bower_components/bootstrap/js/collapse.js'],
      dest: 'assets/js/scripts.min.js'
    }
  },
//  clean: [
//    "assets/js/scripts.js.min",
//    "assets/css/styles.css.min"
//  ],
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
    gruntfile: {
      files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
    },
    templates: {
      files: '**/*.twig',
        tasks: ['shell:generate']
    },
    css: {
      files: '<%= uglify.dist.src %>',
      tasks: ['uglify']
    },
    js: {
      files: '<%= recess.dist.files %>',
      tasks: ['recess']
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
  shell: {
    generate: {
      options: {
        stdout: true
      },
      command: 'php ../../bin/odin --dir=/opt/lampp/htdocs/mike-on-a-bike.com'
    }
  }
});

grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-watch');

grunt.loadNpmTasks('grunt-shell');
grunt.loadNpmTasks('grunt-recess');
grunt.loadNpmTasks('grunt-uncss');

grunt.registerTask('default', ['jshint', 'clean', 'recess', 'uglify']);
};

