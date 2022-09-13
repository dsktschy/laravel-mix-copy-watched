const mix = require('laravel-mix')
const { Component } = require('laravel-mix/src/components/Component')
const CopyFilesTask = require('./copy-files-task')

class CopyWatched extends Component {
  addToManifest (filePath) {
    const normalizedPath = this.context.manifest.normalizePath(filePath)
    const original = normalizedPath.replace(/\?id=\w+/, '');
    this.context.manifest.manifest[original] = normalizedPath
    if (this.context.components.get('version') && !this.context.isUsing('hmr')) {
      this.context.manifest.hash(original)
    }
    this.context.manifest.refresh()
  }

  removeFromManifest (filePath) {
    const normalizedPath = this.context.manifest.normalizePath(filePath)
    const original = normalizedPath.replace(/\?id=\w+/, '');
    delete this.context.manifest.manifest[original]
    this.context.manifest.refresh()
  }

  register (from, to, options = {}) {
    this.context.addTask(new CopyFilesTask({
      from,
      to,
      options,
      addToManifest: this.addToManifest.bind(this),
      removeFromManifest: this.removeFromManifest.bind(this)
    }))
  }
}

mix.extend('copyWatched', CopyWatched)
mix.extend('copyDirectoryWatched', CopyWatched)
