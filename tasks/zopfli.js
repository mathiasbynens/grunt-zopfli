var exec = require('child_process').exec;
var statSync = require('fs').statSync;
var shellEscape = require('shellwords').escape;
var async = require('async');

module.exports = function(grunt) {

	var zopfli = function(filePath, destPath, options, callback) {

		var args = [
			'-c',
			'--i' + options.iterations,
			options.format == 'gzip' ? '--gzip'
				: options.format == 'deflate' ? '--deflate'
					: '--zlib',
			shellEscape(filePath)
		];
		var bin = options.path || 'zopfli';

		if (options.splitLast) {
			args.unshift('--splitlast');
		};

		var command = bin + ' ' + args.join(' ') + ' > ' + shellEscape(destPath);
		exec(command, function(error, stdout, stderr) {
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
		async.eachSeries(this.files, function(filePair, nextPair) {
			var destPath = filePair.dest;
			async.eachSeries(filePair.src, function(srcPath, nextFile) {

				// Warn on invalid source files
				if (!grunt.file.exists(srcPath)) {
					grunt.log.warn('Source file `' + srcPath + '` not found.');
				}

				// Quick hack to create the destination path if it doesn’t exist
				grunt.file.write(destPath, '');

				// Compress the file
				zopfli(srcPath, destPath, options, function(error, stdout) {
					if (error) {
						grunt.log.warn(error);
						nextFile();
					}
					// Print a success message
					grunt.log.writeln('File `' + destPath + '` created.');
					// Print file size info
					if (options.report) {
						grunt.log.writeln('Original:   ' + String(statSync(srcPath).size).green + ' bytes.');
						grunt.log.writeln('Compressed: ' + String(statSync(destPath).size).green + ' bytes.');
					}
					nextFile();
				});

			}, nextPair);
		}, done);

	});

};
