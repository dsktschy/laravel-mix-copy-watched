const CopyFilesTask = require('./copy-files-task')

describe('CopyFilesTask', () => {
  describe('_createDestinationFilePath()', () => {
    describe("{ base: '', dot: true }", () => {
      const options = { base: '', dot: true }
      test('src/foo/bar.ext -> dist/foo.ext : dist/foo.ext', () => {
        execute('src/foo/bar.ext', 'dist/foo.ext', options, 'dist/foo.ext')
      })
      test('src/foo/bar.ext -> dist/foo.ext/ : dist/foo.ext/bar.ext', () => {
        execute('src/foo/bar.ext', 'dist/foo.ext/', options, 'dist/foo.ext/bar.ext')
      })
      test('src/foo/bar.ext -> dist/foo : dist/foo/bar.ext', () => {
        execute('src/foo/bar.ext', 'dist/foo', options, 'dist/foo/bar.ext')
      })
      test('src/foo/bar.ext -> dist/foo/ : dist/foo/bar.ext', () => {
        execute('src/foo/bar.ext', 'dist/foo/', options, 'dist/foo/bar.ext')
      })
      test('src/foo/bar.ext -> dist/foo/bar : dist/foo/bar/bar.ext', () => {
        execute('src/foo/bar.ext', 'dist/foo/bar', options, 'dist/foo/bar/bar.ext')
      })
      test('src/foo/bar.ext -> dist/foo/bar/ : dist/foo/bar/bar.ext', () => {
        execute('src/foo/bar.ext', 'dist/foo/bar/', options, 'dist/foo/bar/bar.ext')
      })
      test('src/foo/bar -> dist/foo.ext : dist/foo.ext', () => {
        execute('src/foo/bar', 'dist/foo.ext', options, 'dist/foo.ext')
      })
      test('src/foo/bar -> dist/foo.ext/ : dist/foo.ext', () => {
        execute('src/foo/bar', 'dist/foo.ext/', options, 'dist/foo.ext')
      })
      test('src/foo/bar -> dist/foo : dist/foo', () => {
        execute('src/foo/bar', 'dist/foo', options, 'dist/foo')
      })
      test('src/foo/bar -> dist/foo/ : dist/foo', () => {
        execute('src/foo/bar', 'dist/foo/', options, 'dist/foo')
      })
      test('src/foo/.ext -> dist/foo.ext : dist/foo.ext', () => {
        execute('src/foo/.ext', 'dist/foo.ext', options, 'dist/foo.ext')
      })
      test('src/foo/.ext -> dist/foo.ext/ : dist/foo.ext/.ext', () => {
        execute('src/foo/.ext', 'dist/foo.ext/', options, 'dist/foo.ext/.ext')
      })
      test('src/foo/.ext -> dist/foo : dist/foo/.ext', () => {
        execute('src/foo/.ext', 'dist/foo', options, 'dist/foo/.ext')
      })
      test('src/foo/.ext -> dist/foo/ : dist/foo/.ext', () => {
        execute('src/foo/.ext', 'dist/foo/', options, 'dist/foo/.ext')
      })
      test('src/foo/.ext -> dist/foo/bar : dist/foo/bar/.ext', () => {
        execute('src/foo/.ext', 'dist/foo/bar', options, 'dist/foo/bar/.ext')
      })
      test('src/foo/.ext -> dist/foo/bar/ : dist/foo/bar/.ext', () => {
        execute('src/foo/.ext', 'dist/foo/bar/', options, 'dist/foo/bar/.ext')
      })
    })
    describe("{ base: 'src', dot: true }", () => {
      const options = { base: 'src', dot: true }
      test('src/foo/bar.ext -> dist/foo.ext : dist/foo.ext', () => {
        execute('src/foo/bar.ext', 'dist/foo.ext', options, 'dist/foo.ext')
      })
      test('src/foo/bar.ext -> dist/foo.ext/ : dist/foo.ext/foo/bar.ext', () => {
        execute('src/foo/bar.ext', 'dist/foo.ext/', options, 'dist/foo.ext/foo/bar.ext')
      })
      test('src/foo/bar.ext -> dist/foo : dist/foo/foo/bar.ext', () => {
        execute('src/foo/bar.ext', 'dist/foo', options, 'dist/foo/foo/bar.ext')
      })
      test('src/foo/bar.ext -> dist/foo/ : dist/foo/foo/bar.ext', () => {
        execute('src/foo/bar.ext', 'dist/foo/', options, 'dist/foo/foo/bar.ext')
      })
      test('src/foo/bar.ext -> dist/foo/bar : dist/foo/bar/foo/bar.ext', () => {
        execute('src/foo/bar.ext', 'dist/foo/bar', options, 'dist/foo/bar/foo/bar.ext')
      })
      test('src/foo/bar.ext -> dist/foo/bar/ : dist/foo/bar/foo/bar.ext', () => {
        execute('src/foo/bar.ext', 'dist/foo/bar/', options, 'dist/foo/bar/foo/bar.ext')
      })
      test('src/foo/bar -> dist/foo.ext : dist/foo.ext', () => {
        execute('src/foo/bar', 'dist/foo.ext', options, 'dist/foo.ext')
      })
      test('src/foo/bar -> dist/foo.ext/ : dist/foo.ext', () => {
        execute('src/foo/bar', 'dist/foo.ext/', options, 'dist/foo.ext')
      })
      test('src/foo/bar -> dist/foo : dist/foo', () => {
        execute('src/foo/bar', 'dist/foo', options, 'dist/foo')
      })
      test('src/foo/bar -> dist/foo/ : dist/foo', () => {
        execute('src/foo/bar', 'dist/foo/', options, 'dist/foo')
      })
      test('src/foo/.ext -> dist/foo.ext : dist/foo.ext', () => {
        execute('src/foo/.ext', 'dist/foo.ext', options, 'dist/foo.ext')
      })
      test('src/foo/.ext -> dist/foo.ext/ : dist/foo.ext/foo/.ext', () => {
        execute('src/foo/.ext', 'dist/foo.ext/', options, 'dist/foo.ext/foo/.ext')
      })
      test('src/foo/.ext -> dist/foo : dist/foo/foo/.ext', () => {
        execute('src/foo/.ext', 'dist/foo', options, 'dist/foo/foo/.ext')
      })
      test('src/foo/.ext -> dist/foo/ : dist/foo/foo/.ext', () => {
        execute('src/foo/.ext', 'dist/foo/', options, 'dist/foo/foo/.ext')
      })
      test('src/foo/.ext -> dist/foo/bar : dist/foo/bar/foo/.ext', () => {
        execute('src/foo/.ext', 'dist/foo/bar', options, 'dist/foo/bar/foo/.ext')
      })
      test('src/foo/.ext -> dist/foo/bar/ : dist/foo/bar/foo/.ext', () => {
        execute('src/foo/.ext', 'dist/foo/bar/', options, 'dist/foo/bar/foo/.ext')
      })
    })
    function execute (from, to, options, result) {
      expect(
        new CopyFilesTask({ to, options })._createDestinationFilePath(from)
      ).toBe(result)
    }
  })
  describe('_createDestinationDirPath()', () => {
    describe("{ base: '', dot: true }", () => {
      const options = { base: '', dot: true }
      test('src/foo/bar -> dist/foo.ext : dist/foo.ext', () => {
        execute('src/foo/bar', 'dist/foo.ext', options, 'dist/foo.ext')
      })
      test('src/foo/bar -> dist/foo.ext/ : dist/foo.ext/', () => {
        execute('src/foo/bar', 'dist/foo.ext/', options, 'dist/foo.ext/')
      })
      test('src/foo/bar -> dist/foo : dist/foo', () => {
        execute('src/foo/bar', 'dist/foo', options, 'dist/foo')
      })
      test('src/foo/bar -> dist/foo/ : dist/foo/', () => {
        execute('src/foo/bar', 'dist/foo/', options, 'dist/foo/')
      })
      test('src/foo/bar/ -> dist/foo.ext : dist/foo.ext', () => {
        execute('src/foo/bar/', 'dist/foo.ext', options, 'dist/foo.ext')
      })
      test('src/foo/bar/ -> dist/foo.ext/ : dist/foo.ext/', () => {
        execute('src/foo/bar/', 'dist/foo.ext/', options, 'dist/foo.ext/')
      })
      test('src/foo/bar/ -> dist/foo : dist/foo', () => {
        execute('src/foo/bar/', 'dist/foo', options, 'dist/foo')
      })
      test('src/foo/bar/ -> dist/foo/ : dist/foo/', () => {
        execute('src/foo/bar/', 'dist/foo/', options, 'dist/foo/')
      })
      test('src/foo/bar/ -> dist/foo/bar : dist/foo/bar', () => {
        execute('src/foo/bar/', 'dist/foo/bar', options, 'dist/foo/bar')
      })
      test('src/foo/bar/ -> dist/foo/bar/ : dist/foo/bar/', () => {
        execute('src/foo/bar/', 'dist/foo/bar/', options, 'dist/foo/bar/')
      })
      test('src/foo/bar.ext -> dist/foo.ext : dist/foo.ext', () => {
        execute('src/foo/bar.ext', 'dist/foo.ext', options, 'dist/foo.ext')
      })
      test('src/foo/bar.ext -> dist/foo.ext/ : dist/foo.ext/', () => {
        execute('src/foo/bar.ext', 'dist/foo.ext/', options, 'dist/foo.ext/')
      })
      test('src/foo/bar.ext -> dist/foo : dist/foo/bar.ext', () => {
        execute('src/foo/bar.ext', 'dist/foo', options, 'dist/foo/bar.ext')
      })
      test('src/foo/bar.ext -> dist/foo/ : dist/foo/bar.ext', () => {
        execute('src/foo/bar.ext', 'dist/foo/', options, 'dist/foo/bar.ext')
      })
      test('src/foo/bar.ext/ -> dist/foo.ext : dist/foo.ext', () => {
        execute('src/foo/bar.ext', 'dist/foo.ext', options, 'dist/foo.ext')
      })
      test('src/foo/bar.ext/ -> dist/foo.ext/ : dist/foo.ext/', () => {
        execute('src/foo/bar.ext', 'dist/foo.ext/', options, 'dist/foo.ext/')
      })
      test('src/foo/bar.ext/ -> dist/foo : dist/foo/bar.ext', () => {
        execute('src/foo/bar.ext', 'dist/foo', options, 'dist/foo/bar.ext')
      })
      test('src/foo/bar.ext/ -> dist/foo/ : dist/foo/bar.ext', () => {
        execute('src/foo/bar.ext', 'dist/foo/', options, 'dist/foo/bar.ext')
      })
      test('src/foo/.ext -> dist/foo.ext : dist/foo.ext', () => {
        execute('src/foo/.ext', 'dist/foo.ext', options, 'dist/foo.ext')
      })
      test('src/foo/.ext -> dist/foo.ext/ : dist/foo.ext/', () => {
        execute('src/foo/.ext', 'dist/foo.ext/', options, 'dist/foo.ext/')
      })
      test('src/foo/.ext -> dist/foo : dist/foo/.ext', () => {
        execute('src/foo/.ext', 'dist/foo', options, 'dist/foo/.ext')
      })
      test('src/foo/.ext -> dist/foo/ : dist/foo/.ext', () => {
        execute('src/foo/.ext', 'dist/foo/', options, 'dist/foo/.ext')
      })
      test('src/foo/.ext/ -> dist/foo.ext : dist/foo.ext', () => {
        execute('src/foo/.ext', 'dist/foo.ext', options, 'dist/foo.ext')
      })
      test('src/foo/.ext/ -> dist/foo.ext/ : dist/foo.ext/', () => {
        execute('src/foo/.ext', 'dist/foo.ext/', options, 'dist/foo.ext/')
      })
      test('src/foo/.ext/ -> dist/foo : dist/foo/.ext', () => {
        execute('src/foo/.ext', 'dist/foo', options, 'dist/foo/.ext')
      })
      test('src/foo/.ext/ -> dist/foo/ : dist/foo/.ext', () => {
        execute('src/foo/.ext', 'dist/foo/', options, 'dist/foo/.ext')
      })
    })
    describe("{ base: 'src', dot: true }", () => {
      const options = { base: 'src', dot: true }
      test('src/foo/bar -> dist/foo.ext : dist/foo.ext/foo/bar', () => {
        execute('src/foo/bar', 'dist/foo.ext', options, 'dist/foo.ext/foo/bar')
      })
      test('src/foo/bar -> dist/foo.ext/ : dist/foo.ext/foo/bar', () => {
        execute('src/foo/bar', 'dist/foo.ext/', options, 'dist/foo.ext/foo/bar')
      })
      test('src/foo/bar -> dist/foo : dist/foo/foo/bar', () => {
        execute('src/foo/bar', 'dist/foo', options, 'dist/foo/foo/bar')
      })
      test('src/foo/bar -> dist/foo/ : dist/foo/foo/bar', () => {
        execute('src/foo/bar', 'dist/foo/', options, 'dist/foo/foo/bar')
      })
      test('src/foo/bar/ -> dist/foo.ext : dist/foo.ext/foo/bar/', () => {
        execute('src/foo/bar/', 'dist/foo.ext', options, 'dist/foo.ext/foo/bar/')
      })
      test('src/foo/bar/ -> dist/foo.ext/ : dist/foo.ext/foo/bar/', () => {
        execute('src/foo/bar/', 'dist/foo.ext/', options, 'dist/foo.ext/foo/bar/')
      })
      test('src/foo/bar/ -> dist/foo : dist/foo/foo/bar/', () => {
        execute('src/foo/bar/', 'dist/foo', options, 'dist/foo/foo/bar/')
      })
      test('src/foo/bar/ -> dist/foo/ : dist/foo/foo/bar/', () => {
        execute('src/foo/bar/', 'dist/foo/', options, 'dist/foo/foo/bar/')
      })
      test('src/foo/bar/ -> dist/foo/bar : dist/foo/bar/foo/bar/', () => {
        execute('src/foo/bar/', 'dist/foo/bar', options, 'dist/foo/bar/foo/bar/')
      })
      test('src/foo/bar/ -> dist/foo/bar/ : dist/foo/bar/foo/bar/', () => {
        execute('src/foo/bar/', 'dist/foo/bar/', options, 'dist/foo/bar/foo/bar/')
      })
      test('src/foo/bar.ext -> dist/foo.ext : dist/foo.ext/foo/bar.ext', () => {
        execute('src/foo/bar.ext', 'dist/foo.ext', options, 'dist/foo.ext/foo/bar.ext')
      })
      test('src/foo/bar.ext -> dist/foo.ext/ : dist/foo.ext/foo/bar.ext', () => {
        execute('src/foo/bar.ext', 'dist/foo.ext/', options, 'dist/foo.ext/foo/bar.ext')
      })
      test('src/foo/bar.ext -> dist/foo : dist/foo/foo/bar.ext', () => {
        execute('src/foo/bar.ext', 'dist/foo', options, 'dist/foo/foo/bar.ext')
      })
      test('src/foo/bar.ext -> dist/foo/ : dist/foo/foo/bar.ext', () => {
        execute('src/foo/bar.ext', 'dist/foo/', options, 'dist/foo/foo/bar.ext')
      })
      test('src/foo/bar.ext/ -> dist/foo.ext : dist/foo.ext/foo/bar.ext', () => {
        execute('src/foo/bar.ext', 'dist/foo.ext', options, 'dist/foo.ext/foo/bar.ext')
      })
      test('src/foo/bar.ext/ -> dist/foo.ext/ : dist/foo.ext/foo/bar.ext', () => {
        execute('src/foo/bar.ext', 'dist/foo.ext/', options, 'dist/foo.ext/foo/bar.ext')
      })
      test('src/foo/bar.ext/ -> dist/foo : dist/foo/foo/bar.ext', () => {
        execute('src/foo/bar.ext', 'dist/foo', options, 'dist/foo/foo/bar.ext')
      })
      test('src/foo/bar.ext/ -> dist/foo/ : dist/foo/foo/bar.ext', () => {
        execute('src/foo/bar.ext', 'dist/foo/', options, 'dist/foo/foo/bar.ext')
      })
      test('src/foo/.ext -> dist/foo.ext : dist/foo.ext/foo/.ext', () => {
        execute('src/foo/.ext', 'dist/foo.ext', options, 'dist/foo.ext/foo/.ext')
      })
      test('src/foo/.ext -> dist/foo.ext/ : dist/foo.ext/foo/.ext', () => {
        execute('src/foo/.ext', 'dist/foo.ext/', options, 'dist/foo.ext/foo/.ext')
      })
      test('src/foo/.ext -> dist/foo : dist/foo/foo/.ext', () => {
        execute('src/foo/.ext', 'dist/foo', options, 'dist/foo/foo/.ext')
      })
      test('src/foo/.ext -> dist/foo/ : dist/foo/foo/.ext', () => {
        execute('src/foo/.ext', 'dist/foo/', options, 'dist/foo/foo/.ext')
      })
      test('src/foo/.ext/ -> dist/foo.ext : dist/foo.ext/foo/.ext', () => {
        execute('src/foo/.ext', 'dist/foo.ext', options, 'dist/foo.ext/foo/.ext')
      })
      test('src/foo/.ext/ -> dist/foo.ext/ : dist/foo.ext/foo/.ext', () => {
        execute('src/foo/.ext', 'dist/foo.ext/', options, 'dist/foo.ext/foo/.ext')
      })
      test('src/foo/.ext/ -> dist/foo : dist/foo/foo/.ext', () => {
        execute('src/foo/.ext', 'dist/foo', options, 'dist/foo/foo/.ext')
      })
      test('src/foo/.ext/ -> dist/foo/ : dist/foo/foo/.ext', () => {
        execute('src/foo/.ext', 'dist/foo/', options, 'dist/foo/foo/.ext')
      })
    })
    function execute (from, to, options, result) {
      expect(
        new CopyFilesTask({ to, options })._createDestinationDirPath(from)
      ).toBe(result)
    }
  })
})
