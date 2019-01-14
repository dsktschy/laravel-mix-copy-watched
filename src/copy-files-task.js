const globby = require('globby')
const path = require('path')
const fs = require('fs-extra')
const chokidar = require('chokidar')
const Task = require('laravel-mix/src/tasks/Task')

class CopyFilesTask extends Task {
  run () {
    this.data.options = Object.assign({
      base: ''
    }, this.data.options)
    this.data.options.base = this.data.options.base.endsWith('/')
      ? this.data.options.base.slice(0, -1)
      : this.data.options.base
    // Execute once
    const paths = globby.sync(this.data.from)
    console.log('\n')
    for (let fromRelative of paths) {
      const fromAbsolute = path.resolve(fromRelative)
      const stats = fs.statSync(fromAbsolute)
      this[stats.isFile() ? '_copyFile' : '_copyDir'](fromRelative)
    }
  }
  watch (usePolling = false) {
    if (this.isBeingWatched) return
    const watcher = chokidar
      .watch(this.data.from, { usePolling, persistent: true })
      .on('change', this._copyFile.bind(this))
      .on('add', this._copyFile.bind(this))
      .on('addDir', this._copyDir.bind(this))
      .on('unlink', this._removeFile.bind(this))
      .on('unlinkDir', this._removeDir.bind(this))
    // Workaround for issue with atomic writes.
    // See https://github.com/paulmillr/chokidar/issues/591
    if (!usePolling) {
      watcher.on('raw', event => {
        if (event === 'rename') {
          watcher.unwatch(this.data.from)
          watcher.add(this.data.from)
        }
      })
    }
    this.isBeingWatched = true
  }
  _copyFile (fromRelative) {
    const fromAbsolute = path.resolve(fromRelative)
    const toRelative = this._createDestinationFilePath(fromRelative)
    const toAbsolute = path.resolve(toRelative)
    fs.copySync(fromAbsolute, toAbsolute)
    console.log(`Copying ${fromRelative} to ${toRelative}`)
    Mix._copyWatched.addManifest(toRelative)
    Mix._copyWatched.callManifestPluginEmitHook()
  }
  _removeFile (fromRelative) {
    const toRelative = this._createDestinationFilePath(fromRelative)
    const toAbsolute = path.resolve(toRelative)
    fs.removeSync(toAbsolute)
    console.log(`Removing ${toRelative}`)
    Mix._copyWatched.removeManifest(toRelative)
    Mix._copyWatched.callManifestPluginEmitHook()
  }
  _copyDir (fromRelative) {
    const fromAbsolute = path.resolve(fromRelative)
    const toRelative = this._createDestinationDirPath(fromRelative)
    const toAbsolute = path.resolve(toRelative)
    fs.copySync(fromAbsolute, toAbsolute)
    console.log(`Copying ${fromRelative} to ${toRelative}`)
    if (!this.isBeingWatched) return
    const paths = globby.sync(`${fromRelative}/**/*`)
    for (let _fromRelative of paths) {
      const _fromAbsolute = path.resolve(_fromRelative)
      const _stats = fs.statSync(_fromAbsolute)
      if (!_stats.isFile()) continue
      const _toRelative = this._createDestinationFilePath(_fromRelative)
      Mix._copyWatched.addManifest(_toRelative)
      Mix._copyWatched.callManifestPluginEmitHook()
    }
  }
  _removeDir (fromRelative) {
    const toRelative = this._createDestinationDirPath(fromRelative)
    const toAbsolute = path.resolve(toRelative)
    fs.removeSync(toAbsolute)
    console.log(`Removing ${toRelative}`)
    if (!this.isBeingWatched) return
    const paths = globby.sync(`${fromRelative}/**/*`)
    for (let _fromRelative of paths) {
      const _fromAbsolute = path.resolve(_fromRelative)
      const _stats = fs.statSync(_fromAbsolute)
      if (!_stats.isFile()) continue
      const _toRelative = this._createDestinationFilePath(_fromRelative)
      Mix._copyWatched.removeManifest(_toRelative)
      Mix._copyWatched.callManifestPluginEmitHook()
    }
  }
  _createDestinationFilePath (from) {
    let to = ''
    if (path.extname(from)) {
      if (!this.data.to.endsWith('/') && path.extname(this.data.to)) {
        to = this.data.to
      } else {
        if (this.data.options.base) {
          let popped = from.split(this.data.options.base).pop()
          popped = popped.startsWith('/') ? popped.slice(1) : popped
          to = path.join(this.data.to, popped)
        } else {
          to = path.join(this.data.to, path.basename(from))
        }
      }
    } else {
      to =
        this.data.to.endsWith('/') ? this.data.to.slice(0, -1) : this.data.to
    }
    return to
  }
  _createDestinationDirPath (from) {
    let to = ''
    const fromSlashless =
      from.endsWith('/') ? from.slice(0, -1) : from
    const toSlashless =
      this.data.to.endsWith('/') ? this.data.to.slice(0, -1) : this.data.to
    if (this.data.options.base) {
      let popped = from.split(this.data.options.base).pop()
      popped = popped.startsWith('/') ? popped.slice(1) : popped
      to = path.join(this.data.to, popped)
    } else {
      if (path.extname(fromSlashless) && !path.extname(toSlashless)) {
        to = path.join(this.data.to, path.basename(from))
      } else {
        to = this.data.to
      }
    }
    return to
  }
}

module.exports = CopyFilesTask
