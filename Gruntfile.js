module.exports = function(grunt) {

	grunt.initConfig({

		'clean': {
			'tests': ['tmp'],
		},

		// Configuration to be run and tested
		'zopfli': {
			'test-1': {
				'options': {},
				'files': {
					'tmp/test-1.js.gz': 'tests/fixtures/jquery.min.js'
				}
			},
			'test-2': {
				'options': {
					'report': false, // don’t show original and compressed size
					'iterations': 50, // min value: 1; (undocumented) max value: 99999999999
					'format': 'zlib', // 'gzip', 'zlib', 'deflate'
					'splitLast': false // perform block splitting first instead of last
				},
				'files': {
					'tmp/test-2.js.zlib': 'tests/fixtures/benchmark.js'
				}
			},
			'test-3': {
				'options': {
					'iterations': 25, // min value: 1; (undocumented) max value: 99999999999
					'format': 'deflate', // 'gzip', 'zlib', 'deflate'
					'splitLast': true // perform block splitting last instead of first
				},
				'files': {
					'tmp/test-3.js.deflate': 'tests/fixtures/benchmark.js'
				}
			},
			'test-4': {
				'options': {
					'iterations': 25, // min value: 1; (undocumented) max value: 99999999999
					'format': 'deflate', // 'gzip', 'zlib', 'deflate'
					'splitLast': false // perform block splitting first instead of last
				},
				'files': {
					'tmp/test-4.js.deflate': 'tests/fixtures/benchmark.js'
				}
			},
			'test-5': {
				'options': {
					'iterations': 10 // min value: 1; (undocumented) max value: 99999999999
				},
				'files': {
					'tmp/test-5-a.js.gz': 'tests/fixtures/benchmark.js',
					'tmp/test-5-b.js.gz': 'tests/fixtures/jquery.min.js'
				}
			},
			'test-6': {
				'options': {
					'iterations': 5, // min value: 1; (undocumented) max value: 99999999999
				},
				'src': ['tests/fixtures/*'],
				'dest': 'tmp/test-6/',
				'expand': true,
				'ext': '.js.gz'
			}
		},

		// Unit tests
		'nodeunit': {
			'tests': ['tests/tests.js']
		}

	});

	grunt.loadTasks('tasks');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	grunt.registerTask('test', ['clean', 'zopfli', 'nodeunit']);
	grunt.registerTask('default', ['test']);

};
