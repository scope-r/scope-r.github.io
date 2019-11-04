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
const src = './src';

// Clean previous build
function clean() {
    return del([dist.concat('/*.html'), dist.concat('/assets')],
                { force: true });
}

//Build the CSS
function css() {
    return gulp
      .src(src.concat('/assets/**/*.css'))
      .pipe(gulp.dest(dist
                .concat('/assets')))
      .pipe(connect.reload());
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

//Build the JS
function js() {
    return gulp
        .src(src.concat('/assets/**/*.{js,min.js}'))
        .pipe(gulp.dest(dist.concat('/assets')))
        .pipe(connect.reload());
}

//Build the HTML
function html() {
    return gulp
        .src(src.concat('/*.html'))
        .pipe(gulp.dest(dist))
        .pipe(connect.reload());
}

function fonts() {
    return gulp
        .src(src.concat('/assets/fonts/**/*.{eot,ttf,woff,svg,woff2}'))
        .pipe(gulp.dest(dist.concat('/assets/fonts')))
        .pipe(connect.reload());
}

function images() {
    return gulp
        .src(src.concat('/assets/images/**/**/*.{png,jpeg,jpg}'))
        .pipe(gulp.dest(dist.concat('/assets/images')))
        .pipe(connect.reload());
}

// Watch files
async function watchFiles() {
  gulp.watch(src.concat('/assets/**/*.scss'), scss);
  gulp.watch([src.concat('/assets/**/*.js'), src.concat('!/assets/**/*.min.js')], js);
  gulp.watch(src.concat('/*.html'), html);
}

//Run the server
async function webserver() {
    await connect.server({
        name: 'Scope-R',
        root: src,
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
exports.clean = clean;
exports.css = css;
exports.scss = scss;
exports.js = js;
exports.html = html;
exports.fonts = fonts;
exports.images = images;
