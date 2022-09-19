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
const mix = require('laravel-mix')

require('laravel-mix-copy-watched')

mix.copyWatched(
  'src/images',
  'dist/images',
  { base: 'src/images' }
)
```

## API

### copyWatched(from, to, options)

This method has the same usage as [the `copy` and `copyDirectory` methods](https://laravel-mix.com/docs/4.0/copying-files).

#### from

Type: `string | string[]`

Paths or glob patterns to files and directories to be copied.

```js
mix.copyWatched('from.png', 'to')
mix.copyWatched('from/**/*.txt', 'to', { base: 'from' })
mix.copyWatched('from/**/*.{jpg,jpeg,png,gif}', 'to', { base: 'from' })
mix.copyWatched(['from1.jpg', 'from2.webp'], 'to')
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
// src/images/foo.png -> dist/foo.png
mix.copyWatched(
  'src',
  'dist'
)

// src/images/foo.png -> dist/images/foo.png
mix.copyWatched(
  'src',
  'dist',
  { base: 'src' }
)
```

##### dot

Type: `boolean`  
Default: `false`

If set to `true`, files and directories whose names start with a dot will be copied.

```js
// src/.foorc -> No output
mix.copyWatched(
  'src',
  'dist',
  { base: 'src' }
)

// src/.foorc -> dist/.foorc
mix.copyWatched(
  'src',
  'dist',
  {
    base: 'src',
    dot: true
  }
)
```

### copyDirectoryWatched(from, to, options)

This method is an alias for [the `copyWatched` method](#copywatchedfrom-to-options).
