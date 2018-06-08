const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');
const htmlmin = require('gulp-htmlmin');
const pump = require('pump');
const babel = require('gulp-babel');
const jsonminify = require('gulp-jsonminify');

gulp.task('html', () => {
  return gulp
    .src('*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('css', () => {
  return gulp
    .src('css/*.css')
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('json', () => {
  return gulp
    .src('data/*.json')
    .pipe(jsonminify())
    .pipe(gulp.dest('dist/data'));
});

gulp.task('js', function(cb) {
  pump(
    [
      gulp.src(['js/*.js']),
      sourcemaps.init(),
      babel({
        presets: ['env']
      }),
      uglify(),
      sourcemaps.write(),
      gulp.dest('dist/js')
    ],
    cb
  );
});

gulp.task('img', () => {
  return gulp
    .src('img/*')
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }]
        })
      ])
    )
    .pipe(gulp.dest('dist/img'));
});

gulp.task('default', ['html', 'css', 'json', 'js', 'img']);
