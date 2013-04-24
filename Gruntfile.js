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
					'tmp/jquery.min.js.gz': 'tests/fixtures/jquery.min.js'
				},
			},
			'test-2': {
				'options': {},
				'files': {
					'tmp/benchmark.js.gz': 'tests/fixtures/benchmark.js'
				},
			},
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
