const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

/*

	GULP top level function
		gulp.task - defines tasks
		gulp.src - points to development soucre code dir
		gulp.dest - points to production source code dir
		gulp.watch - watchs files and folders for changes

*/

/*
defining your own task
to run it use 'gulp say_hi' command
*/
gulp.task('say_hi',function () {
	return console.log('Hello world from Awais using gulp.');
});

/*
copying all html files from src to dist
*/
gulp.task('copyHtml',function () {
	// if 'dist' dir isn't created gulp will create it it self
	gulp.src('src/*.html').pipe(gulp.dest('dist'));
});

/*
creating task for images optimization using imagemin
*/
gulp.task('minImages', () =>
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
);

/*
creating task for code minifier
*/
gulp.task('minify',function () {
	gulp.src('src/js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'));
});

/*
creating task for sass compiler
*/
gulp.task('sass', function(){
  gulp.src('src/sass/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/css'));
});


// Scripts
gulp.task('concat_scripts', function(){
  gulp.src('src/js/*.js')
      .pipe(concat('main.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'));
});

/*
defining default gulp task or a series of task with in default to be called
to run just use 'gulp' command 
*/
gulp.task('default',['say_hi','copyHtml','minImages','minify','sass','concat_scripts']);

/*
gulp watch works like nodemon but the difference is you need to 
define the event to execute for each file type so when change is made that event is shot
*/
gulp.task('watch', function(){
  gulp.watch('src/js/*.js', ['scripts']);
  gulp.watch('src/images/*', ['imageMin']);
  gulp.watch('src/sass/*.scss', ['sass']);
  gulp.watch('src/*.html', ['copyHtml']);
});