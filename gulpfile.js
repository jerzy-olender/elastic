let gulp = require('gulp');
let sass = require('gulp-sass');
let browserSync = require('browser-sync').create();

gulp.task('serve', ['sass'], function(){

  browserSync.init({
    server: "./"
  });

  gulp.watch('assets/sass/*', ['sass']);
  gulp.watch('./*.html').on('change', browserSync.reload);

});

gulp.task('sass', function(){
   return gulp.src('assets/sass/*')
        .pipe(sass())
        .pipe(gulp.dest('assets/css'))
        .pipe(browserSync.stream());
});

gulp.task('watch', function(){
  gulp.watch('assets/sass/*', ['sass']); 

})