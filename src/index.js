const mix = require('laravel-mix')
const CopyFilesTask = require('./copy-files-task')
const ManifestPlugin = require('./manifest-plugin')

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
  },
  // Remove asset from manifest
  removeManifest (filePath) {
    const normalizedPath = Mix.manifest.normalizePath(filePath)
    const original = normalizedPath.replace(/\?id=\w{20}/, '')
    delete Mix.manifest.manifest[original]
  },
  // Enable to trigger hook to rewrite mix-manifest.json in watching
  // Defined in manifest-plugin.js
  callManifestPluginEmitHook () {}
}

class CopyWatched {
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
mix.extend('copyDirectoryWatched', new CopyWatched())
