// Basics
import gulp from 'gulp'
import path from 'path'

// Preprocessors
import pug from 'gulp-pug'
import sass from 'gulp-sass'
import babel from 'gulp-babel'

// Media
import imagemin from 'gulp-imagemin'
import imageResize from 'gulp-image-resize'

// Utilities
import jshint from 'gulp-jshint'
import livereload from 'gulp-livereload'

// Constants
const src = 'src/',
      build = 'docs/'

// ----------------Tasks---------------- //


// Preprocessors
gulp.task('pug', () => {
  gulp.src(path.join(src + 'pug/index.pug'))
  .pipe(pug({pretty: true}))
  .pipe(gulp.dest(build))
  .pipe(livereload())
})
gulp.task('sass', () => {
  gulp.src(path.join(src + 'sass/main.sass'))
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest(path.join(build + 'assets/css')))
  .pipe(livereload())
})

gulp.task('es6', () => {
  gulp.src(path.join(src + 'js/index.js'))
  .pipe(jshint({
    esversion: 6,
    asi: true,
    unused: true
  }))
  .pipe(jshint.reporter('default'))
  .pipe(babel({presets: ['es2015']}))
  .pipe(gulp.dest(path.join(build + 'assets/js')))
  .pipe(livereload())
})

// Media tasks

gulp.task('images', () => {
  gulp.src(path.join(src + 'media/images/*'))
  .pipe(imageResize({
     width : 1920,
     upscale : false
   }))
  .pipe(imagemin(
    imagemin.jpegtran({progressive: true})
  ))
  .pipe(gulp.dest(path.join(build + 'assets/img')))
})


// ----------------Bundled tasks---------------- //


gulp.task('preprocess', ['sass','pug','es6'])
gulp.task('watch', () => {
  livereload.listen()
  gulp.watch(path.join(src + 'sass/**/*.sass'), ['sass'])
  gulp.watch(path.join(src + 'pug/**/*'), ['pug'])
  gulp.watch(path.join(src + 'js/*.js'), ['es6'])
  livereload.reload()
})
gulp.task('default', ['watch','preprocess', 'images'])

module.exports = gulp
