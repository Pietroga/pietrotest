
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
            watch: {
            
            options: {livereload: true,},
           
            html: {
                files: ['app/**/**/**.html', 'app/**/**/**.html', 'app/pages-components/**.html'], // which files to watch
            },
            js: {
                files: ['app/**/**/**.js', 'app/**/**.js', 'app/app.js', 'app/controller.js', 'app/bower_components/allmighty-autocomplete/style/autocomplete.css'], // which files to watch
            }}
            
  });
    

    
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.registerTask('default', ['watch']);


};