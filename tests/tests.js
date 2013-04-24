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

var compare = function(inputFile, expectedOutputFile, description, test) {
	var actual = grunt.file.read(inputFile);
	var expected = grunt.file.read(expectedOutputFile);
	test.equal(actual, expected, description);
	test.done();
};

exports.zopfli = {
	'test-1': function(test) {
		compare(
			'tmp/jquery.min.js.gz',
			'tests/expected/jquery.min.js.gz',
			'jQuery',
			test
		);
	},
	'test-2': function(test) {
		compare(
			'tmp/benchmark.js.gz',
			'tests/expected/benchmark.js.gz',
			'Benchmark.js',
			test
		);
	}
};
