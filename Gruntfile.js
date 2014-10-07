module.exports = function(grunt) {

  grunt.initConfig({
    //pkg: grunt.file.readJSON('package.json'),

		protractor: {
		    options: {
		      configFile: "protractor.conf.js", // Default config file
		      keepAlive: true, // If false, the grunt process stops when the test fails.
		      noColor: false, // If true, protractor will not use colors in its output.
		      args: {
		        // Arguments passed to the command
		      }
		    },
		    your_target: {   // Grunt requires at least one target to run so you can simply put 'all: {}' here too.
		      options: {
		        configFile: "protractor.conf.js", // Target-specific config file
		        args: {} // Target-specific arguments
		      }
		    },
		  }
		
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-protractor-runner');

  //grunt.registerTask('default', ['jshint']);
  grunt.registerTask('default', ['protractor', 'protractor:your_target']);
  

};