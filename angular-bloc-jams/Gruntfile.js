 module.exports = function(grunt) {
 
    grunt.registerTask('default', 'Testing out Grunt logging and task callbacks', function() {
        grunt.log.writeln('This is our first Grunt task!');
    });
 
    grunt.registerTask('fun', 'This task is for fun only', function() {
        grunt.log.writeln('This the *fun* Grunt task');
    });
 
    grunt.registerTask('serious', 'This task is for serious stuff only', function() {
        grunt.log.writeln('Wipe that smirk off your face; this is serious.');
    });   
 };