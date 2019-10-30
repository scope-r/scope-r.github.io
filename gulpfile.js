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
const dist = 'dist';

// Clean previous build
function clean() {
    return del(["./".concat(dist)
                .concat("/")],
                { force: true });
}

//Build the CSS
function css() {
    return gulp
      .src('./assets/**/*.css')
      .pipe(gulp.dest('./'.concat(dist)
                .concat('/assets')))
      .pipe(connect.reload());
}

function scss() {
    return gulp
      .src("./assets/**/*.scss")
      .pipe(plumber())
      .pipe(sass({
        outputStyle: "expanded",
        includePaths: "./node_modules",
      }))
      .on("error", sass.logError)
      .pipe(rename({
        dirname: "css"
      }))
      .pipe(gulp.dest('./'
              .concat(dist)
              .concat('/assets')))
      .pipe(rename({
        suffix: ".min",
        dirname: "css"
      }))
      .pipe(cleanCSS())
      .pipe(gulp.dest('./'
              .concat(dist)
              .concat('/assets')))
      .pipe(connect.reload());
}

//Build the JS
function js() {
    return gulp
        .src('./assets/**/*.{js,min.js}')
        .pipe(gulp.dest('./'
            .concat(dist).concat('/assets')))
        .pipe(connect.reload());
}

//Build the HTML
function html() {
    return gulp
        .src('./*.html')
        .pipe(gulp.dest('./'.concat(dist)))
        .pipe(connect.reload());
}

function fonts() {
    return gulp
        .src('./assets/fonts/**/*.{eot,ttf,woff,svg,woff2}')
        .pipe(gulp.dest('./'
                        .concat(dist)
                        .concat('/assets/fonts')))
        .pipe(connect.reload());
}

function images() {
    return gulp
        .src('./assets/images/**/**/*.{png,jpeg,jpg}')
        .pipe(gulp.dest('./'
                        .concat(dist)
                        .concat('/assets/images')))
        .pipe(connect.reload());
}

// Watch files
async function watchFiles() {
  gulp.watch("./assets/**/*.scss", scss);
  gulp.watch(['./assets/**/*.js', '!./assets/**/*.min.js'], js);
  gulp.watch("./*.html", html);
}

//Run the server
async function webserver() {
    await connect.server({
        name: 'Scope-R',
        root: './'.concat(dist),
        port: 80,
        livereload: true
    });
}


const build = gulp.series(clean,
    gulp.parallel(css, scss, html, js, fonts, images));

const serve = gulp.series(build,
    gulp.parallel(webserver, watchFiles));

exports.default = build;
exports.serve = serve;
exports.css = css;
exports.scss = scss;
exports.js = js;
