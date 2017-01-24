let gulp = require('gulp'),
	connect = require('gulp-connect'),
	rename = require('gulp-rename'),
	sourcemaps = require('gulp-sourcemaps'),
	html_min = require('gulp-htmlmin'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	css_beautify = require('gulp-cssbeautify'),
	css_min = require('gulp-clean-css'),
	js_min = require('gulp-uglify'),
	img_min = require('gulp-imagemin');

gulp.task('server', () => {
	connect.server({
		port: 8080,
		root: 'dist',
		livereload: true
	});
});

gulp.task('html', () => {
	gulp.src('./dist/*.html')
	.pipe(connect.reload())
});

gulp.task('html-min', () => {
	gulp.src('./dist/*.html')
	.pipe(html_min({collapseWhitespace: true}))
	.pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist'))
})

gulp.task('sass',  () => 
	setTimeout(function(){
	  	gulp.src('./src/scss/**/*.scss')	
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
		.pipe(css_beautify())
		.pipe(gulp.dest('./dist/css'))
		.pipe(connect.reload())
	}, 500)
);

gulp.task('css-min', () => 
	gulp.src('./dist/css/main.css')
	.pipe(css_min())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('./dist/css/'))
);

gulp.task('js', () => 
	gulp.src('./src/js/main.js')
	.pipe(gulp.dest('./dist/js/'))
	.pipe(connect.reload())
);

gulp.task('js-min', () => 
  	gulp.src('./dist/js/main.js')
	.pipe(js_min())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('./dist/js/'))
);

gulp.task('img-min', () =>
    gulp.src('./dist/img/**/*.*')
    .pipe(img_min({
       	progressive: true
    }))
    .pipe(gulp.dest('./dist/img/'))
);

gulp.task('watcher', () => {
	gulp.watch('./dist/*.html', ['html']);
	gulp.watch('./src/scss/**/*.scss', ['sass']);
	gulp.watch('./dist/css/main.css', ['css-min']);
	gulp.watch('./src/js/*.js', ['js']);
	gulp.watch('./dist/js/main.js', ['js-min']);
});

gulp.task('default', ['server', 'watcher']);
