/*
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

# Framework @ Sniper Front-End 3 - https://github.com/h1dd3nsn1p3r/sniper-front-end

# Package @ Your_project_name

# Author @ Anuj Subedi

# Author Url @ http://anujsubedi.com.np/

# License MIT ( Free to use & changes for persional and commercial uses )

# Since 2017 Nov 

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

**/

'use strict';


// include all necessary plugins in gulp file

var gulp 				= require('gulp');

var order				= require('gulp-order');

var concat  			= require('gulp-concat');

var sass       			= require('gulp-sass');

var sourcemaps 			= require('gulp-sourcemaps');

var uglify 				= require('gulp-uglify');

var rename				= require('gulp-rename');

var imagemin 			= require('gulp-imagemin');

var cache 				= require('gulp-cache');





// Task defined for java scripts bundling and minifying

gulp.task('scripts', function() {


	return gulp.src('assets/src/js/*.js')

	.pipe(order([


		// example, to bundle js files

		"assets/src/popper.min.js",
		"assets/src/js/bootstrap.min.js",
		], { base: './' })) 

      .pipe(concat('bundle.js'))

      .pipe(rename({suffix: '.min'}))

      .pipe(uglify())

      .pipe(gulp.dest('assets/dist/js'));


});




// Task define for compliling scss file

// Curerntly i am not using this complier 

gulp.task('sass', function() {

  
	  	 return gulp.src('assets/src/scss/**/*.scss', {style: 'compressed'})

	  	.pipe(rename({suffix: 'gulp_bundle.min'}))

	    .pipe(sourcemaps.init())  // Process the original sources

	    .pipe(sass())

	    .pipe(sourcemaps.write()) // Add the map to modified source.

	    .pipe(gulp.dest('assets/dist/css/'));
});



// Define task to optimize images in project

gulp.task('images', function() {


  	return gulp.src('assets/src/img/**/*')

    .pipe(cache(imagemin({ optimizationLevel:5, progressive: true, interlaced: true })))

    .pipe(gulp.dest('assets/dist//img'));

});


// Task watch

gulp.task('watch', function() {


	  // Watch .js files

	  gulp.watch('assets/src/js/*.js', ['scripts']);


	   // Watch .scss files


	  gulp.watch('assets/src/css/*.scss', ['sass']);


	   // Watch image files

	  gulp.watch('assets/src/img/**/*', ['images']);


});


// declaring final task and command tasker

// just hit the command "gulp" it will run the following tasks...


gulp.task('default', ['scripts', 'images' , 'sass' , 'watch']);
