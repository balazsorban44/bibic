// Basics
import gulp from 'gulp'
import path from 'path'

// Preprocessors
import pug from 'gulp-pug'
import sass from 'gulp-sass'
import babel from 'gulp-babel'

// Minifiers
import htmlMin from 'gulp-htmlmin'
import cleanCSS from 'gulp-clean-css'
import imageMin from 'gulp-image'
import imageResize from 'gulp-image-resize'

// Utilities
import jshint from 'gulp-jshint'
import livereload from 'gulp-livereload'
import webserver from 'gulp-webserver'
import gutil from 'gulp-util'

// Constants
const src = 'src/',
      build = 'docs/'

// ----------------Tasks---------------- //


// Preprocessors
gulp.task('pug', () => {
  gulp.src(path.join(src + 'pug/index.pug'))
  .pipe(pug({pretty:true}))
  .on('error', gutil.log)
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
  .on('error', function(e) {
      this.emit('end');
    })
  .pipe(gulp.dest(path.join(build + 'assets/js')))
  .pipe(livereload())
})

// Minifiers
gulp.task('htmlMin', () => {
  gulp.src(path.join(src + 'pug/index.pug'))
  .pipe(pug())
  .pipe(htmlMin({removeComments: true}))
  .pipe(gulp.dest(build))
})

gulp.task('cleanCSS', () => {
  gulp.src(path.join(src + 'sass/main.sass'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(path.join(build + 'assets/css')))
    .pipe(cleanCSS({debug: true}, (details) => {
        console.log(details.name + ' before: ' + details.stats.originalSize/1000 +
        'kb and after: ' + details.stats.minifiedSize/1000 + 'kb');
      }))
    .pipe(gulp.dest(path.join(build + 'assets/css')))
})

gulp.task('images', () => {
  gulp.src(path.join(src + 'media/images/**/*.{jpg,png,svg}'))
  .pipe(imageResize({
    imageMagick: true,
    width:2560,
    height: 2560,
    upscale : false
   }))
  .pipe(imageMin({
     guetzli: true,
     optipng: true,
     svgo: true
  }))
  .pipe(gulp.dest(path.join(build + 'assets/img')))
})

// Utilites

gulp.task('webserver', () => {
  gulp.src(build)
    .pipe(webserver({
      directoryListing: true,
      open: true,
      host: '0.0.0.0',
      port: 8000
    }));
});



// ----------------Bundled tasks---------------- //


gulp.task('preprocess', ['sass','pug','es6'])
gulp.task('watch', () => {
  livereload.listen()
  gulp.watch(path.join(src + 'sass/**/*.sass'), ['sass'])
  gulp.watch(path.join(src + 'pug/**/*'), ['pug'])
  gulp.watch(path.join(src + 'js/*.js'), ['es6'])
  livereload.reload()
})
gulp.task('default', ['watch','preprocess'])

gulp.task('minify', ['htmlMin','cleanCSS'])
module.exports = gulp
