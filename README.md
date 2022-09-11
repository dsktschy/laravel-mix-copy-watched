# Laravel Mix Copy Watched [![npm version](https://img.shields.io/npm/v/laravel-mix-copy-watched.svg?style=flat-square)](https://www.npmjs.com/package/laravel-mix-copy-watched) [![GitHub license](https://img.shields.io/badge/license-MIT-green.svg?style=flat-square)](https://github.com/dsktschy/laravel-mix-copy-watched/blob/master/LICENSE.txt)

This extension provides a copy method that can watch for not only changes but also additions and deletions.

## Installation

### With laravel-mix@>=6

```sh
$ npm install --save-dev laravel-mix-copy-watched
```

### With laravel-mix@<6

```sh
$ npm install --save-dev laravel-mix-copy-watched@2
```

## Usage

```js
let mix = require('laravel-mix');

require('laravel-mix-copy-watched');

mix
  .js('resources/js/app.js', 'public/js')
  .sass('resources/sass/app.scss', 'public/css')
  .copyWatched('resources/images/app.png', 'public/images');
```

## API

### copyWatched(from, to, options)

This method has the same usage as [the `copy` and `copyDirectory` methods](https://laravel-mix.com/docs/4.0/copying-files).

#### from

Type: `string | string[]`

Paths or glob patterns to files and directories to be copied.

```js
mix.copyWatched('from.png', 'to');
mix.copyWatched('from/**/*.txt', 'to');
mix.copyWatched('from/**/*.{jpg,jpeg,png,gif}', 'to');
mix.copyWatched(['from1.jpg', 'from2.webp'], 'to');
```

#### to

Type: `string`

Destination path for copied files and directories.

#### options

Type: `object`

Contains the following properties.

##### base

Type: `string`  
Default: `''`

When a path to a directory is set, the directory will be copied with the hierarchical structure kept.

```js
// resources/images/foo.png -> public/foo.png
mix.copyWatched(
  'resources/**/*',
  'public'
);

// resources/images/foo.png -> public/images/foo.png
mix.copyWatched(
  'resources/**/*',
  'public',
  { base: 'resources' }
);
```

##### dot

Type: `boolean`  
Default: `false`

If set to `true`, files and directories whose names start with a dot will be copied.

```js
// resources/.foorc -> No output
mix.copyWatched(
  'resources',
  'public',
);

// resources/.foorc -> public/.foorc
mix.copyWatched(
  'resources',
  'public',
  { dot: true }
);
```

### copyDirectoryWatched(from, to, options)

This method is an alias for [the `copyWatched` method](#copywatchedfrom-to-options).
