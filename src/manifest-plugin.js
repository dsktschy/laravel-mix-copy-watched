const SyncHook = require('tapable').SyncHook

// Provide callable hook to rewrite mix-manifest.js
class ManifestPlugin {
  static get hookName () {
    return 'emitLaravelMixCopyWatched'
  }
  apply(compiler) {
    // Create custom hook
    if (compiler.hooks[ManifestPlugin.hookName])
      throw new Error('Already in use')
    compiler.hooks[ManifestPlugin.hookName] = new SyncHook()
    // Hook to rewrite mix-manifest.js
    compiler.plugin(ManifestPlugin.hookName, () => {
      Mix.manifest.refresh()
    })
    // Enable to trigger hook in watching
    Mix._copyWatched.callManifestPluginEmitHook = () => {
      compiler.hooks[ManifestPlugin.hookName].call()
    }
  }
}

module.exports = ManifestPlugin
