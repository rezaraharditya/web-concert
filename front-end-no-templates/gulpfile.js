var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var prefix= require('gulp-autoprefixer');
var jade = require('gulp-jade');
var imagemin = require('gulp-imagemin');

gulp.task('browserSync', ['sass', 'jade','imagemin'],function(){
  browserSync.init({
    server:{
      baseDir: "./"
    }
  });
});


gulp.task('sass', function(){
  return gulp.src('_assets/_sources/_sass/*.sass')
    .pipe(sass({includePaths:['_sources','_sass']}))
    .pipe(prefix(['last 15 versions', '>1%', 'ie 8', 'ie 7'],{cascade:true}))
    .on('error',sass.logError)
    .pipe(gulp.dest('_assets/_dist/css'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('jade', function(){
  return gulp.src('_jadefiles/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./'))
});

gulp.task('imagemin', function(){
  return gulp.src('_assets/_sources/images')
    .pipe(imagemin())
    .pipe(gulp.dest('_assets/_dist'))
})

gulp.task('watch', function(){
  gulp.watch("_assets/_sass/**/*.sass",['sass']);
  gulp.watch("_jadefiles/*.jade",['jade']);
  gulp.watch("./*.html").on('change', browserSync.reload);
})

gulp.task('default',['sass', 'browserSync','jade','watch']);
