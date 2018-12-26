const mix = require('laravel-mix')
const glob = require('glob')
const path = require('path')
const fs = require('fs-extra')
const chokidar = require('chokidar')
const dev = process.env.NODE_ENV === 'development'

class CopyWatched {
  name() {
    return [
      'copyWatched',
      'copyDirectoryWatched'
    ];
  }
  register (from, to, options = {}) {
    this.from = from
    this.to = to
    this.options = Object.assign({
      base: ''
    }, options)
  }
  boot () {
    if (dev) {
      chokidar.watch(this.from)
        .on('add', this._copyFile.bind(this))
        .on('change', this._copyFile.bind(this))
        .on('unlink', this._removeFile.bind(this))
        .on('addDir', this._copyDir.bind(this))
        .on('unlinkDir', this._removeDir.bind(this))
    } else {
      glob(this.from, (err, paths) => {
        if (err) throw err
        for (let _path of paths) {
          const fullPath = path.join(__dirname, _path)
          fs.stat(fullPath, (_err, stats) => {
            if (_err) throw _err
            this[stats.isFile() ? '_copyFile' : '_copyDir'](_path)
          })
        }
      })
    }
  }
  _copyFile (_path) {
    const from = path.join(__dirname, _path)
    const to = this._createDestinationFilePath(_path)
    fs.copy(from, to, err => { if (err) throw err })
    console.log(`\nCopying ${from} to ${to}`)
  }
  _removeFile (_path) {
    const from = path.join(__dirname, _path)
    const to = this._createDestinationFilePath(_path)
    fs.remove(to, err => { if (err) throw err })
    console.log(`\nRemoving ${to}`)
  }
  _copyDir (_path) {
    const from = path.join(__dirname, _path)
    const to = this._createDestinationDirPath(_path)
    fs.copy(from, to, err => { if (err) throw err })
    console.log(`\nCopying ${from} to ${to}`)
  }
  _removeDir (_path) {
    const from = path.join(__dirname, _path)
    const to = this._createDestinationDirPath(_path)
    fs.remove(to, err => { if (err) throw err })
    console.log(`\nRemoving ${to}`)
  }
  /**
   * e.g. Without base option. This result is imitating original copy task
   * _path: src/foo/bar.ext(file), this.to: dist/foo.ext,  result: dist/foo.ext
   * _path: src/foo/bar.ext(file), this.to: dist/foo.ext/, result: dist/foo.ext/bar.ext
   * _path: src/foo/bar.ext(file), this.to: dist/foo,      result: dist/foo/bar.ext
   * _path: src/foo/bar.ext(file), this.to: dist/foo/,     result: dist/foo/bar.ext
   * _path: src/foo/bar.ext(file), this.to: dist/foo/bar,  result: dist/foo/bar/bar.ext
   * _path: src/foo/bar.ext(file), this.to: dist/foo/bar/, result: dist/foo/bar/bar.ext
   * _path: src/foo/bar(file),     this.to: dist/foo.ext,  result: dist/foo.ext
   * _path: src/foo/bar(file),     this.to: dist/foo.ext/, result: dist/foo.ext
   * _path: src/foo/bar(file),     this.to: dist/foo,      result: dist/foo
   * _path: src/foo/bar(file),     this.to: dist/foo/,     result: dist/foo
   *
   * e.g. With base option: { base: 'src/' }
   * _path: src/foo/bar.ext(file), this.to: dist/foo.ext,  result: dist/foo.ext
   * _path: src/foo/bar.ext(file), this.to: dist/foo.ext/, result: dist/foo.ext/foo/bar.ext
   * _path: src/foo/bar.ext(file), this.to: dist/foo,      result: dist/foo/foo/bar.ext
   * _path: src/foo/bar.ext(file), this.to: dist/foo/,     result: dist/foo/foo/bar.ext
   * _path: src/foo/bar.ext(file), this.to: dist/foo/bar,  result: dist/foo/bar/foo/bar.ext
   * _path: src/foo/bar.ext(file), this.to: dist/foo/bar/, result: dist/foo/bar/foo/bar.ext
   * _path: src/foo/bar(file),     this.to: dist/foo.ext,  result: dist/foo.ext
   * _path: src/foo/bar(file),     this.to: dist/foo.ext/, result: dist/foo.ext
   * _path: src/foo/bar(file),     this.to: dist/foo,      result: dist/foo
   * _path: src/foo/bar(file),     this.to: dist/foo/,     result: dist/foo
   */
  _createDestinationFilePath (_path) {
    let to = ''
    if (path.extname(_path)) {
      if (!this.to.endsWith('/') && path.extname(this.to)) {
        to = path.join(__dirname, this.to)
      } else {
        if (this.options.base) {
          const base = this.options.base.endsWith('/')
            ? this.options.base
            : this.options.base.slice(0, -1)
          to = path.join(__dirname, this.to, _path.split(base).pop())
        } else {
          to = path.join(__dirname, this.to, path.basename(_path))
        }
      }
    } else {
      const toSlashless =
        this.to.endsWith('/') ? this.to.slice(0, -1) : this.to
      to = path.join(__dirname, toSlashless)
    }
    return to
  }
  /**
   * e.g. Without base option. This result is imitating original copy task
   * _path: src/foo/bar/,          this.to: dist/foo.ext,  result: dist/foo.ext/
   * _path: src/foo/bar/,          this.to: dist/foo.ext/, result: dist/foo.ext/
   * _path: src/foo/bar/,          this.to: dist/foo,      result: dist/foo/
   * _path: src/foo/bar/,          this.to: dist/foo/,     result: dist/foo/
   * _path: src/foo/bar/,          this.to: dist/foo/bar,  result: dist/foo/bar/
   * _path: src/foo/bar/,          this.to: dist/foo/bar/, result: dist/foo/bar/
   * _path: src/foo/bar(dir),      this.to: dist/foo.ext,  result: dist/foo.ext/
   * _path: src/foo/bar(dir),      this.to: dist/foo.ext/, result: dist/foo.ext/
   * _path: src/foo/bar(dir),      this.to: dist/foo,      result: dist/foo/
   * _path: src/foo/bar(dir),      this.to: dist/foo/,     result: dist/foo/
   * _path: src/foo/bar.ext/,      this.to: dist/foo.ext,  result: dist/foo.ext/
   * _path: src/foo/bar.ext/,      this.to: dist/foo.ext/, result: dist/foo.ext/
   * _path: src/foo/bar.ext/,      this.to: dist/foo,      result: dist/foo/bar.ext/
   * _path: src/foo/bar.ext/,      this.to: dist/foo/,     result: dist/foo/bar.ext/
   * _path: src/foo/bar.ext(dir),  this.to: dist/foo.ext,  result: dist/foo.ext/
   * _path: src/foo/bar.ext(dir),  this.to: dist/foo.ext/, result: dist/foo.ext/
   * _path: src/foo/bar.ext(dir),  this.to: dist/foo,      result: dist/foo/bar.ext/
   * _path: src/foo/bar.ext(dir),  this.to: dist/foo/,     result: dist/foo/bar.ext/
   *
   * e.g. With base option: { base: 'src/' }
   * _path: src/foo/bar/,          this.to: dist/foo.ext,  result: dist/foo.ext/foo/bar/
   * _path: src/foo/bar/,          this.to: dist/foo.ext/, result: dist/foo.ext/foo/bar/
   * _path: src/foo/bar/,          this.to: dist/foo,      result: dist/foo/foo/bar/
   * _path: src/foo/bar/,          this.to: dist/foo/,     result: dist/foo/foo/bar/
   * _path: src/foo/bar/,          this.to: dist/foo/bar,  result: dist/foo/bar/foo/bar/
   * _path: src/foo/bar/,          this.to: dist/foo/bar/, result: dist/foo/bar/foo/bar/
   * _path: src/foo/bar(dir),      this.to: dist/foo.ext,  result: dist/foo.ext/foo/bar/
   * _path: src/foo/bar(dir),      this.to: dist/foo.ext/, result: dist/foo.ext/foo/bar/
   * _path: src/foo/bar(dir),      this.to: dist/foo,      result: dist/foo/foo/bar/
   * _path: src/foo/bar(dir),      this.to: dist/foo/,     result: dist/foo/foo/bar/
   * _path: src/foo/bar.ext/,      this.to: dist/foo.ext,  result: dist/foo.ext/foo/bar.ext/
   * _path: src/foo/bar.ext/,      this.to: dist/foo.ext/, result: dist/foo.ext/foo/bar.ext/
   * _path: src/foo/bar.ext/,      this.to: dist/foo,      result: dist/foo/foo/bar.ext/
   * _path: src/foo/bar.ext/,      this.to: dist/foo/,     result: dist/foo/foo/bar.ext/
   * _path: src/foo/bar.ext(dir),  this.to: dist/foo.ext,  result: dist/foo.ext/foo/bar.ext/
   * _path: src/foo/bar.ext(dir),  this.to: dist/foo.ext/, result: dist/foo.ext/foo/bar.ext/
   * _path: src/foo/bar.ext(dir),  this.to: dist/foo,      result: dist/foo/foo/bar.ext/
   * _path: src/foo/bar.ext(dir),  this.to: dist/foo/,     result: dist/foo/foo/bar.ext/
   */
  _createDestinationDirPath (_path) {
    let to = ''
    const _pathSlashless =
      _path.endsWith('/') ? _path.slice(0, -1) : _path
    const toSlashless =
      this.to.endsWith('/') ? this.to.slice(0, -1) : this.to
    if (this.options.base) {
      const base = this.options.base.endsWith('/')
        ? this.options.base
        : this.options.base.slice(0, -1)
      to = path.join(__dirname, this.to, _path.split(base).pop())
    } else {
      if (path.extname(_pathSlashless) && !path.extname(toSlashless)) {
        to = path.join(__dirname, this.to, path.basename(_path))
      } else {
        to = path.join(__dirname, this.to)
      }
    }
    return to
  }
}

mix.extend('copyWatched', new CopyWatched())
