module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
            watch: {
              options: {livereload: true,
	      },
           
            html: {
                files: ['app/**/**/**.html', 'app/**/**/**.html'], // which files to watch
            },
            js: {
                files: ['app/**/**/**.js', 'app/**/**.js'], // which files to watch
            }}
            
  });
    

    
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.registerTask('default', ['watch']);


};