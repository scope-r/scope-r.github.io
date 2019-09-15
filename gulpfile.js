var gulp = require('gulp');
var connect = require('gulp-connect');
var del = require('del');

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

//Run the server
async function webserver() {
    await connect.server({
        name: 'Scope-R',
        root: './'.concat(dist),
        port: 3001,
        livereload: true
    });
}


const build = gulp.series(clean,
    gulp.parallel(css, html, js, fonts, images),
    gulp.series(webserver));

exports.default = build;