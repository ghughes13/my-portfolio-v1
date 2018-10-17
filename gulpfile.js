'use strict';

var gulp = require('gulp'),
    uglifycss = require('gulp-uglifycss'),
    image = require('gulp-image'),
    del = require('del'),
    terser = require('gulp-terser');

  gulp.task('delete', () => {
    return del('dist');
  });

  gulp.task('copyfiles', () => {
    return gulp.src(['portfolioPics/**', 'SubSites/**','index.html','lakevideo.mp4','mountainthumb.jpg', 'script.js','normalize.css','styles.css'], {base : './'})
    .pipe(gulp.dest('dist'));
  });

  function es(){
    return gulp.src('dist/SubSites/**/*.js')
      .pipe(terser())
      .pipe(gulp.dest('dist/SubSites/**/*.js'));
  };

  gulp.task('miniJS', es);

  gulp.task('img', () => {
    return gulp.src('dist/portfolioPics/*')
      .pipe(image())
      .pipe(gulp.dest('dist/portfolioPics'))
  })
