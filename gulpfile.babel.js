// Basics
import gulp from 'gulp'
import path from 'path'

// Preprocessors
import pug from 'gulp-pug'
import sass from 'gulp-sass'
import babel from 'gulp-babel'

// Minifiers, Optimizers
import htmlMin from 'gulp-htmlmin'
import cssMin from 'gulp-clean-css'
import jsMin from 'gulp-minify'
import imageMin from 'gulp-image'
import imageResize from 'gulp-image-resize'

// Utilities
import jshint from 'gulp-jshint'
import browserSync from 'browser-sync'
import concat from 'gulp-concat'

// Constants
const src = 'src/main/',
      build = 'docs/',
      reload = browserSync.reload


// ----------------Tasks---------------- //


// Preprocessors
gulp.task('pug', () => {
  gulp.src(path.join(src + 'pug/*.pug'))
  .pipe(pug({pretty:true}))
  .pipe(gulp.dest(build))
  .pipe(browserSync.stream())

})

gulp.task('sass', () => {
  gulp.src(path.join(src + 'sass/main.sass'))
  .pipe(sass())
  .on('error', sass.logError)
  .pipe(gulp.dest(path.join(build + 'assets/css')))
  .pipe(browserSync.stream())
})

gulp.task('es6', () => {
  gulp.src(path.join(src + 'js/**/*.js'))
  .pipe(concat('index.js'))
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
})

// Minify, Optimize

gulp.task('minifyHTML', () => {
  gulp.src(path.join(src + 'pug/index.pug'))
  .pipe(pug())
  .pipe(htmlMin({removeComments: true}))
  .pipe(gulp.dest(build))
})

gulp.task('minifyCSS', () => {
  gulp.src(path.join(src + 'sass/main.sass'))
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest(path.join(build + 'assets/css')))
  .pipe(cssMin({debug: true}, (details) => {
    console.log(details.name + ' before: ' + details.stats.originalSize/1000 +
    'kb and after: ' + details.stats.minifiedSize/1000 + 'kb');
  }))
  .pipe(gulp.dest(path.join(build + 'assets/css')))
})

gulp.task('minifyJS', () => {
  gulp.src(path.join(src + 'js/**/*.js'))
  .pipe(concat('index.js'))
  .pipe(babel({presets: ['es2015']}))
  .pipe(jsMin({
    ext:{min: '.js'},
    noSource: true
  }))
  .pipe(gulp.dest(path.join(build + 'assets/js')))
})


gulp.task('optimizeImages', () => {
  gulp.src(path.join(src + 'media/images/**/*.{jpg,png}'))
  .pipe(imageResize({
    imageMagick: true,
    width: 2560,
    height: 2560,
    upscale : false
   }))
  .pipe(imageMin({
     guetzli: true,
     optipng: true
  }))
  .pipe(gulp.dest(path.join(build + 'assets/images')))
})

gulp.task('optimizeIcons', () => {
  gulp.src(path.join(src + 'media/icons/*.svg'))
  .pipe(imageMin({svgo: true}))
  .pipe(gulp.dest(path.join(build + 'assets/icons')))
})

// Utilites

gulp.task('serve', ['pug', 'sass', 'es6'], () => {
  browserSync({
    notify: false,
    server: ['./docs']
  })

  gulp.watch(path.join(src + 'sass/**/*.sass'), ['sass'])
  gulp.watch(path.join(src + '{pug,media/icons}/**/*.{pug,svg}'), ['pug', reload])
  gulp.watch(path.join(src + 'js/**/*.js'), ['es6', reload])

})




// ----------------Bundled tasks---------------- //

gulp.task('minify', ['minifyHTML','minifyCSS', 'minifyJS'])

gulp.task('optimize', ['optimizeImages', 'optimizeIcons'])

gulp.task('default', ['serve'])



module.exports = gulp
