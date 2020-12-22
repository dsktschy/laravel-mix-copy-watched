const mix = require('laravel-mix')
const File = require('laravel-mix/src/File')
const CopyFilesTask = require('./copy-files-task')

// Custom functions
Mix._copyWatched = {
  // Add asset to manifest
  addManifest (filePath) {
    let normalizedPath = Mix.manifest.normalizePath(filePath)
    const original = normalizedPath.replace(/\?id=\w{20}/, '')
    if (Mix.components.components.version != null) {
      normalizedPath = original + '?id=' + new File(filePath).version()
    }
    Mix.manifest.manifest[original] = normalizedPath
    Mix.manifest.refresh()
  },
  // Remove asset from manifest
  removeManifest (filePath) {
    const normalizedPath = Mix.manifest.normalizePath(filePath)
    const original = normalizedPath.replace(/\?id=\w{20}/, '')
    delete Mix.manifest.manifest[original]
    Mix.manifest.refresh()
  }
}

class CopyWatched {
  register (from, to, options = {}) {
    Mix.addTask(new CopyFilesTask({ from, to, options }))
  }
}

mix.extend('copyWatched', new CopyWatched())
mix.extend('copyDirectoryWatched', new CopyWatched())
