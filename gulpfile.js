const resolve = require('rollup-plugin-node-resolve');
const gulp = require('gulp');
const del = require('del');
const browserSync = require('browser-sync').create();
const rollup = require('rollup');

async function build() {
  // see below for details on the options
  const inputOptions = {
    input: ['src/todo-app.js', 'src/todo-list.js'],
    plugins: [resolve({
      // pass custom options to the resolve plugin
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      }
    })]
  };
  const outputOptions = {
    dir: 'dist',
    format: 'cjs'
  };

  // create a bundle
  const bundle = await rollup.rollup(inputOptions);

  // generate code
  const {output} = await bundle.generate(outputOptions);

  // or write the bundle to disk
  await bundle.write(outputOptions);
}

gulp.task('clean', () => {
  return del('dist');
});

/**
 * Bundle JS files starting from main.js
 */
gulp.task('rollup', ['clean'], async () => {
  return await build();
});

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', ['rollup'], done => {
  browserSync.reload();
  done();
});

// use default task to launch Browsersync and watch JS files
gulp.task('default', ['rollup'], () => {

  // Serve files from the root of this project
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  // add browserSync.reload to the tasks array to make
  // all browsers reload after tasks are complete.
  gulp.watch('src/**/*.js', ['js-watch']);
});
