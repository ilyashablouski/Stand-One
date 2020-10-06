/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
// Plugins
const {
  parallel,
  series,
  watch,
  src,
  dest,
} = require('gulp');
const less = require('gulp-less');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const terser = require('gulp-terser');
const gcmq = require('gulp-group-css-media-queries');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const smartgrid = require('smart-grid');
const browserSync = require('browser-sync').create();
const rename = require('gulp-rename');

// Globs
const config = {
  root: './src/',
  html: 'index.html',
  css: {
    src: 'less/+(styles).less',
    watch: 'less/**/*.less',
    dest: './src/css',
  },
  js: {
    src: 'js/+(common).mjs',
    watch: 'js/**/*.mjs',
    dest: './src/js',
  },
};

/**
 * Compile less to css
 *
 * @return {string} Return file's paths
 */
function css() {
  return src(config.root + config.css.src)
    .pipe(less())
    .pipe(gcmq())
    .pipe(dest(config.css.dest))
    .pipe(browserSync.stream())
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions'],
    }))
    .pipe(cleanCSS({
      level: 2,
    }))
    .pipe(rename({
      extname: '.min.css',
    }))
    .pipe(dest(config.css.dest));
}

/**
 * Compile js for production
 *
 * @return {string} Return file's paths
 */
function js() {
  return src(config.root + config.js.src)
    // .pipe(terser({
    //   ecma: 6,
    //   keep_fnames: false,
    //   mangle: {
    //     toplevel: true,
    //   },
    //   compress: {
    //     drop_console: true,
    //   },
    // }))
    // .pipe(rename({
    //   extname: '.min.mjs',
    // }))
    // .pipe(dest(config.js.dest))
    .pipe(babel())
    .pipe(uglify({
      toplevel: true,
    }))
    .pipe(rename({
      extname: '.js',
    }))
    .pipe(dest(config.js.dest));
}

/**
 * Initialize smart-grid library
 *
 * @param {*} done End async function
 */
function grid(done) {
  smartgrid('src/less', {
    container: {
      maxWidth: '1440px',
    },
  });
  done();
}

/**
 * Initialize live reload
 *
 * @param {*} done End async function
 */
function livereload(done) {
  browserSync.init({
    server: {
      baseDir: './src/',
    },
  });

  done();
}

/**
 * Task's assignment
 */
exports.css = css;
exports.grid = grid;
exports.js = js;

// Build final bundle from less, js
exports.build = parallel(css, js);
// Watch changes from html, less, js
exports.watch = series(parallel(css, js), livereload,
  function () {
    watch(config.root + config.html, function (done) {
      browserSync.reload();

      done();
    });

    watch(config.root + config.css.watch, css);

    watch(config.root + config.js.watch, series(js, function (done) {
      browserSync.reload();

      done();
    }));
  });
