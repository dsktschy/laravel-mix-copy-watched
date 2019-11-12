# Laravel Mix Copy Watched

This extension provides a copy method that can watch for not only changes but also additions and deletions.

## Usage

First, install the extension.

```
npm install laravel-mix-copy-watched --save-dev
```

Then, require it within your `webpack.mix.js` file, like so:

```js
let mix = require('laravel-mix');

require('laravel-mix-copy-watched');

mix
    .js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css')
    .copyWatched('resources/images/app.png', 'public/images');
```

And you're done!

The `copyWatched` and `copyDirectoryWatched` methods have the same usage as [the `copy` and `copyDirectory` methods](https://laravel-mix.com/docs/4.0/copying-files).

```js
mix.copyWatched(from, to);
mix.copyWatched('from/regex/**/*.txt', to);
mix.copyWatched([path1, path2], to);
mix.copyDirectoryWatched(fromDir, toDir);
```

With the base option, it is possible to keep a hierarchical structure (like Gulp).

```js
mix.copyWatched(
    'resources/images/**/*.{jpg,jpeg,png,gif}',
    'public/images',
    { base: 'resources/images' }
);
```

With the dot option, it is possible to copy files and directories whose names start with dot.

```js
mix.copyWatched(
    'resources/images',
    'public/images',
    { dot: true }
);
```
