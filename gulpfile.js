const gulp = require('gulp');
const connect = require('gulp-connect');
const del = require('del');
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");
const cleanCSS = require("gulp-clean-css");
const concat = require('gulp-concat');

/**
 * Variables used as global vars across the application
 */
const dist = '.';
const src = '.';

// Clean previous build
function clean() {
  return del([dist.concat('/assets/css/**/*.css'),
  dist.concat('/assets/js/scope-r-all.*')],
    { force: true }
  );
}

function scss() {
  return gulp
    .src(src.concat("/assets/**/*.scss"))
    .pipe(plumber())
    .pipe(sass({
      outputStyle: "expanded",
      includePaths: "./node_modules",
    }))
    .on("error", sass.logError)
    .pipe(rename({
      dirname: "css"
    }))
    .pipe(gulp.dest(dist
      .concat('/assets')))
    .pipe(rename({
      suffix: ".min",
      dirname: "css"
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest(dist.concat('/assets')))
    .pipe(connect.reload());
}

function js() {
  return gulp.src([src.concat("/assets/js/scope-r.js"),
  src.concat("/assets/js/scope-r-controllers/**/*.js"),
  src.concat("/assets/js/scope-r-models/**/*.js")])
    .pipe(concat('scope-r-all.js'))
    .pipe(gulp.dest(dist.concat('/assets/js')))
    .pipe(rename('scope-r-all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dist.concat('/assets/js')))
    .pipe(connect.reload());
}

function html() {
  return gulp.src(src.concat("/**/*.html"))
    .pipe(connect.reload());
}

// Watch files
async function watchFiles() {
  gulp.watch(src.concat('/assets/**/*.scss'), scss);
  gulp.watch([src.concat('/assets/**/*.js'),
              '!'.concat(src).concat('/assets/**/*.min.js'),
              '!'.concat(src).concat('/assets/**/scope-r-all.js')], js);
  gulp.watch(src.concat('/**/*.html'), html);
}

async function copyFiles() {
  gulp.src('./node_modules/bootstrap/dist/css/bootstrap.min.css')
    .pipe(gulp.dest('./assets/vendor/bootstrap/css/'));

  gulp.src('./node_modules/bootstrap/dist/js/bootstrap.min.js')
    .pipe(gulp.dest('./assets/vendor/bootstrap/js/'));
}

//Run the server
async function webserver() {
  await connect.server({
    name: 'Scope-R',
    root: ".",
    port: 80,
    livereload: true
  });
}


const build = gulp.series(clean,
  copyFiles,
  gulp.parallel(scss, js));

const serve = gulp.series(build,
  gulp.parallel(webserver, watchFiles));

exports.default = build;
exports.serve = serve;
exports.clean = clean;
exports.scss = scss;
exports.js = js;
