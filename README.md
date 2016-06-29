# grunt-zopfli [![Build status](https://travis-ci.org/mathiasbynens/grunt-zopfli.svg?branch=master)](https://travis-ci.org/mathiasbynens/grunt-zopfli) [![Dependency status](https://gemnasium.com/mathiasbynens/grunt-zopfli.svg)](https://gemnasium.com/mathiasbynens/grunt-zopfli)

A Grunt plugin for compressing files using [Zopfli](https://github.com/google/zopfli).

## Getting started

This plugin requires Grunt v0.4.0+. Also, Zopfli must be installed.

### Zopfli

First, you need a binary for your OS.

#### OS X

Installing Zopfli is easy with [Homebrew](http://brew.sh/) — just run the following command:

```bash
brew update; brew install zopfli
```

#### Other operating systems

Compile the `zopfli` binary, then move it to any directory in our `$PATH`. Assuming `/usr/local/bin` is in your `$PATH`, you can just follow these steps:

```bash
cd /tmp
curl -LO 'https://github.com/google/zopfli/archive/zopfli-1.0.1.zip'
unzip zopfli-1.0.1.zip
cd zopfli-zopfli-1.0.1
make
chmod +x zopfli
cp zopfli /usr/local/bin
```

Here’s an equivalent oneliner that can safely be copy-pasted:

```bash
cd /tmp; curl -LO 'https://github.com/google/zopfli/archive/zopfli-1.0.1.zip'; unzip zopfli-1.0.1.zip; cd zopfli-zopfli-1.0.1; make; chmod +x zopfli; cp zopfli /usr/local/bin
```

### Grunt

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
      },
      'path': '' // Optional full path to `zopfli` binary; defaults to `zopfli` in `$PATH`
    }
  }
});
```

**Note:** Grunt offers [several ways](http://gruntjs.com/configuring-tasks#files) to define `src` → `dest` (source → destination) file mappings. This plugin supports all of them.

### Options

The `options` property can be used to override the following settings:

#### `report`
Type: `Boolean`
Default: `true`

Show the original and compressed file size (`true`). Or not (`false`). Whatever.

#### `iterations`
Type: `Number`
Default: `15`

The number of iterations Zopfli will perform. Higher values result in better compression at the cost of speed.

#### `format`
Type: `String`
Possible values: `'gzip'`, `'zlib'`, `'deflate'`
Default: `'gzip'`

The desired output format.

#### `splitLast`
Type: `Boolean`
Default: `false`

By default (`false`), Zopfli will perform block splitting first instead of last. Set to `true` to make Zopfli perform block splitting last instead of first.

### Usage example

Here’s a practical example of grunt-zopfli with default settings:

```js
grunt.initConfig({
  'zopfli': {
    'compress-plugins': {
      'files': {
        'dist/plugins.min.js.gz': 'dist/plugins.min.js'
      }
    }
  }
});
```

Here’s a slightly more advanced example:

```js
grunt.initConfig({
  'zopfli': {
    'compress-plugins': {
      'options': {
        'report': false, // don’t show original and compressed size (default: `true`)
        'iterations': 50, // min value: `1`; (undocumented) max value: `99999999999` (default: `15`)
        'format': 'zlib', // `'gzip'`, `'zlib'`, `'deflate'` (default: `'gzip'`)
        'splitLast': true // perform block splitting first instead of last (default: `false`)
      },
      'files': {
        'dist/plugins.min.js.gz': 'dist/plugins.min.js'
      }
    }
  }
});
```

Or, to compress all files in `input-directory`, and save the compressed files to `output-directory`, using [Grunt’s dynamic path expansion](http://gruntjs.com/configuring-tasks#files):

```js
grunt.initConfig({
  'zopfli': {
    'compress': {
      'options': {
        'iterations': 20 // min value: `1`; (undocumented) max value: `99999999999` (default: `15`)
      },
      'files': {
        'src': ['input-directory/*'],
        'dest': 'output-directory/',
        'expand': true,
        'ext': '.js.gz'
      }
    }
  }
});
```

## Author

| [![twitter/mathias](https://gravatar.com/avatar/24e08a9ea84deb17ae121074d0f17125?s=70)](https://twitter.com/mathias "Follow @mathias on Twitter") |
|---|
| [Mathias Bynens](https://mathiasbynens.be/) |

## License

grunt-zopfli is dual licensed under the [MIT](https://mths.be/mit) and [GPL](https://mths.be/gpl) licenses.
