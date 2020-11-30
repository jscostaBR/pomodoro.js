const {src, dest, series, watch} = require('gulp')
const nodemon = require('nodemon')

const sass = require('gulp-sass')
sass.compiler = require('node-sass')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
// const csslint = require('gulp-csslint')
const rename = require('gulp-rename')

function styles(){
 return src('./public/scss/*.scss')
  .pipe(sass().on('error', sass.logError))
  // .pipe(postcss([ autoprefixer(), cssnano() ]))
  .pipe(postcss([ autoprefixer()]))
  // .pipe(csslint('./csslintrc.json'))
  // .pipe(csslint.formatter('text'))
  .pipe(rename({suffix: '.min'}))
  .pipe(dest('./public/css/'))
}

function nodemon_rs(done){
 nodemon({
  verbose: false,
  script: 'app.js',
  ext: 'html,scss',
  done: done
 })
}

exports.styles = styles
exports.nodemon = nodemon_rs
exports.default = function(){
 watch('./public/**/*.html', nodemon_rs);
 watch('./public/scss/**/*.scss', styles);
}