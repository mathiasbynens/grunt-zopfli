var exec = require('child_process').exec;
var shellEscape = require('shellwords').escape;

var zopfli = function(filePath, callback) {
	var command = 'zopfli -c ' + shellEscape(filePath);
	exec(command,
		function (error, stdout, stderr) {
			if (error) {
				grunt.log.warn(error);
				return;
			}
			callback.call(this, error || stderr, stdout);
	});
};

module.exports = function(grunt) {

	grunt.registerMultiTask('zopfli', 'Compress files using Zopfli.', function() {

		var done = this.async();

		// Merge task-specific and/or target-specific options with these defaults:
		var options = this.options({
			// TODO?
		});

		// Iterate over all specified file groups
		this.files.forEach(function(file) {

			var filePath = file.src[0];

			// Warn on invalid source files
			if (!grunt.file.exists(filePath)) {
				grunt.log.warn('Source file `' + filePath + '` not found.');
			}

			// Compress the file
			zopfli(filePath, function(error, stdout) {
				if (error) {
					done(false);
				}
				// Write the destination file
				grunt.file.write(file.dest, stdout);
				// Print a success message
				grunt.log.writeln('File `' + file.dest + '` created.');
				done();
			});

		});
	});

};
