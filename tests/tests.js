var grunt = require('grunt');
var zlib = require('zlib'); // http://nodejs.org/api/zlib.html#zlib_zlib
var fs = require('fs');

var getFunctionName = function(compressionType) {
	switch (compressionType) {
		case 'gzip':
			return 'createGunzip';
		case 'deflate':
			return 'createInflateRaw';
		case 'zlib':
			return 'createInflate';
	}
};

var decompress = function(compressedFile, compressionType, callback) {
	var actual = '';
	fs.createReadStream(compressedFile)
		.pipe(zlib[ getFunctionName(compressionType) ]())
		.on('data', function(buffer) {
			actual += buffer.toString();
		})
		.on('end', function() {
			callback(actual);
		});
};

exports.zopfli = {
	'test-1': function(test) {
		test.expect(1);
		decompress('tmp/test-1.js.gz', 'gzip', function(actual) {
			test.equal(
				grunt.file.read('tests/fixtures/jquery.min.js'),
				actual,
				'jQuery, default settings'
			);
			test.done();
		});
	},
	'test-2': function(test) {
		test.expect(1);
		decompress('tmp/test-2.js.zlib', 'zlib', function(actual) {
			test.equal(
				grunt.file.read('tests/fixtures/benchmark.js'),
				actual,
				'Benchmark.js, 50 iterations, zlib format'
			);
			test.done();
		});
	},
	'test-3': function(test) {
		test.expect(1);
		decompress('tmp/test-3.js.deflate', 'deflate', function(actual) {
			test.equal(
				grunt.file.read('tests/fixtures/benchmark.js'),
				actual,
				'Benchmark.js, 10 iterations, deflate format, perform block splitting last'
			);
			test.done();
		});
	},
	'test-4': function(test) {
		test.expect(1);
		decompress('tmp/test-4.js.deflate', 'deflate', function(actual) {
			test.equal(
				grunt.file.read('tests/fixtures/benchmark.js'),
				actual,
				'Benchmark.js, 10 iterations, deflate format, perform block splitting first'
			);
			test.done();
		});
	},
	'test-5-a': function(test) {
		test.expect(1);
		decompress('tmp/test-5-a.js.gz', 'gzip', function(actual) {
			test.equal(
				grunt.file.read('tests/fixtures/benchmark.js'),
				actual,
				'Benchmark.js, 10 iterations, first of two files'
			);
			test.done();
		});
	},
	'test-5-b': function(test) {
		test.expect(1);
		decompress('tmp/test-5-b.js.gz', 'gzip', function(actual) {
			test.equal(
				grunt.file.read('tests/fixtures/jquery.min.js'),
				actual,
				'jQuery, 10 iterations, second of two files'
			);
			test.done();
		});
	},
	'test-6-a': function(test) {
		test.expect(1);
		decompress('tmp/test-6/tests/fixtures/benchmark.js.gz', 'gzip', function(actual) {
			test.equal(
				grunt.file.read('tests/fixtures/benchmark.js'),
				actual,
				'Benchmark.js, 5 iterations, using dynamic file path expansion'
			);
			test.done();
		});
	},
	'test-6-b': function(test) {
		test.expect(1);
		decompress('tmp/test-6/tests/fixtures/jquery.js.gz', 'gzip', function(actual) {
			test.equal(
				grunt.file.read('tests/fixtures/jquery.min.js'),
				actual,
				'jQuery, 5 iterations, using dynamic file path expansion'
			);
			test.done();
		});
	}
};
