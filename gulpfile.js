const gulp = require('gulp');
const connect = require('gulp-connect');
const del = require('del');
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");
const cleanCSS = require("gulp-clean-css");

/**
 * Variables used as global vars across the application
 */
const dist = '.';
const src = '.';

// Clean previous build
function clean() {
    return del([dist.concat('/assets/css/**/*.css')],
                { force: true });
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

// Watch files
async function watchFiles() {
  gulp.watch(src.concat('/assets/**/*.scss'), scss);
  //gulp.watch([src.concat('/assets/**/*.js'), src.concat('!/assets/**/*.min.js')], js);
  gulp.watch(src.concat('/*.html'), connect.reload());
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
    gulp.parallel(scss));

const serve = gulp.series(build,
    gulp.parallel(webserver, watchFiles));

exports.default = build;
exports.serve = serve;
exports.clean = clean;
exports.scss = scss;
