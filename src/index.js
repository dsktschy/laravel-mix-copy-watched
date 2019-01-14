const mix = require('laravel-mix')
const CopyFilesTask = require('./copy-files-task')
const ManifestPlugin = require('./manifest-plugin')

// Custom functions
Mix._copyWatched = {
  // Add asset to manifest
  addManifest (filePath) {
    filePath = Mix.manifest.normalizePath(filePath)
    const original = filePath.replace(/\?id=\w{20}/, '')
    Mix.manifest.manifest[original] = filePath
  },
  // Remove asset from manifest
  removeManifest (filePath) {
    filePath = Mix.manifest.normalizePath(filePath)
    const original = filePath.replace(/\?id=\w{20}/, '')
    delete Mix.manifest.manifest[original]
  },
  // Enable to trigger hook to rewrite mix-manifest.json in watching
  // Defined in manifest-plugin.js
  callManifestPluginEmitHook () {}
}

class CopyWatched {
  name() {
    return [
      'copyWatched',
      'copyDirectoryWatched'
    ]
  }
  register (from, to, options = {}) {
    Mix.addTask(new CopyFilesTask({ from, to, options }))
  }
  webpackPlugins () {
    return [
      new ManifestPlugin()
    ]
  }
}

mix.extend('copyWatched', new CopyWatched())
