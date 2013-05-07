var grunt = require('grunt');

/*
	======== A Handy Little Nodeunit Reference ========
	https://github.com/caolan/nodeunit

	Test methods:
		test.expect(numAssertions)
		test.done()
	Test assertions:
		test.ok(value, [message])
		test.equal(actual, expected, [message])
		test.notEqual(actual, expected, [message])
		test.deepEqual(actual, expected, [message])
		test.notDeepEqual(actual, expected, [message])
		test.strictEqual(actual, expected, [message])
		test.notStrictEqual(actual, expected, [message])
		test.throws(block, [error], [message])
		test.doesNotThrow(block, [error], [message])
		test.ifError(value)
*/

var compare = function(inputFile, expectedOutputFile, description, test, moreToCome) {
	var actual = grunt.file.read(inputFile);
	var expected = grunt.file.read(expectedOutputFile);
	test.equal(actual, expected, description);
	if (!moreToCome) {
		test.done();
	}
};

exports.zopfli = {
	'test-1': function(test) {
		compare(
			'tmp/test-1.js.gz',
			'tests/expected/test-1.js.gz',
			'jQuery, default settings',
			test
		);
	},
	'test-2': function(test) {
		compare(
			'tmp/test-2.js.zlib',
			'tests/expected/test-2.js.zlib',
			'Benchmark.js, 50 iterations, zlib format',
			test
		);
	},
	'test-3': function(test) {
		compare(
			'tmp/test-3.js.deflate',
			'tests/expected/test-3.js.deflate',
			'Benchmark.js, 10 iterations, deflate format, perform block splitting last',
			test
		);
	},
	'test-4': function(test) {
		compare(
			'tmp/test-4.js.deflate',
			'tests/expected/test-4.js.deflate',
			'Benchmark.js, 10 iterations, deflate format, perform block splitting first',
			test
		);
	},
	'test-5': function(test) {
		compare(
			'tmp/test-5-a.js.gz',
			'tests/expected/test-5-a.js.gz',
			'Benchmark.js, 10 iterations, first of two files',
			test,
			true
		);
		compare(
			'tmp/test-5-b.js.gz',
			'tests/expected/test-5-b.js.gz',
			'jQuery, 10 iterations, second of two files',
			test
		);
	},
	'test-6': function(test) {
		compare(
			'tmp/test-6/tests/fixtures/benchmark.js.gz',
			'tests/expected/test-6-a.js.gz',
			'Benchmark.js, 5 iterations, using dynamic file path expansion',
			test,
			true
		);
		compare(
			'tmp/test-6/tests/fixtures/jquery.js.gz',
			'tests/expected/test-6-b.js.gz',
			'jQuery, 5 iterations, using dynamic file path expansion',
			test
		);
	}
};
