# grunt-zopfli

A Grunt plugin for compressing files using [Zopfli](https://code.google.com/p/zopfli/).

## Getting started

This plugin requires Grunt v0.4.0+.

If you haven’t used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you’re familiar with that process, you may install this plugin with this command:

```bash
npm install grunt-zopfli --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-zopfli');
```

## The `zopfli` task

### Overview

In your project’s Gruntfile, add a section named `zopfli` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
	'zopfli': {
		'options': {
			// Task-specific options go here
		},
		'your-target': {
			'options': {
				// Target-specific options go here
			},
			'files': {
				// Target-specific file lists go here
			}
		}
	}
});
```

### Usage example

Here’s a practical example of grunt-zopfli:

```js
// TODO
```

## Author

[Mathias Bynens](http://mathiasbynens.be/)
  [![twitter/mathias](http://gravatar.com/avatar/24e08a9ea84deb17ae121074d0f17125?s=70)](http://twitter.com/mathias "Follow @mathias on Twitter")

## License

grunt-zopfli is dual licensed under the [MIT](http://mths.be/mit) and [GPL](http://mths.be/gpl) licenses.
