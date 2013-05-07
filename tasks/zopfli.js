var execFile = require('child_process').execFile;
var statSync = require('fs').statSync;

module.exports = function(grunt) {

	var zopfli = function(filePath, options, callback) {

		var args = [
			'-c',
			'--i' + options.iterations,
			options.format == 'gzip' ? '--gzip'
				: options.format == 'deflate' ? '--deflate'
					: '--zlib',
			filePath
		];

		if (options.splitLast) {
			args.unshift('--splitlast');
		};

		execFile('zopfli', args, function(error, stdout, stderr) {
			callback.call(this, error || stderr, stdout);
		});
	};

	grunt.registerMultiTask('zopfli', 'Compress files using Zopfli.', function() {

		var done = this.async();

		// Merge task-specific and/or target-specific options with these defaults:
		var options = this.options({
			'report': true, // show original and compressed size
			'iterations': 15, // min value: 1; (undocumented) max value: 99999999999
			'format': 'gzip', // 'gzip', 'zlib', 'deflate'
			'splitLast': false // perform block splitting first instead of last
		});

		// Double-check options
		if (options.iterations < 1 || options.iterations > 99999999999) {
			// invalid `iterations` value given; fall back to the default
			options.iterations = 15;
		}
		if (['gzip', 'zlib', 'deflate'].indexOf(options.format) == -1) {
			// invalid `format` value given; fall back to the default
			options.format = 'gzip';
		}

		// Iterate over all specified file groups
		grunt.util.async.forEach(this.files, function(files, nextSet) {
			var destPath = files.dest;
			grunt.util.async.forEach(files.src, function(srcPath, nextFile) {
				// Warn on invalid source files
				if (!grunt.file.exists(srcPath)) {
					grunt.log.warn('Source file `' + srcPath + '` not found.');
				}

				// Compress the file
				zopfli(srcPath, options, function(error, stdout) {
					if (error) {
						grunt.log.warn(error);
						return nextFile(false);
					}
					// Write the destination file
					grunt.file.write(destPath, stdout);
					// Print a success message
					grunt.log.writeln('File `' + destPath + '` created.');
					// Print file size info
					if (options.report) {
						grunt.log.writeln('Original:   ' + String(statSync(srcPath).size).green + ' bytes.');
						grunt.log.writeln('Compressed: ' + String(stdout.length).green + ' bytes.');
					}
					nextFile();
				});
			}, nextSet);
		}, done);
	});

};
