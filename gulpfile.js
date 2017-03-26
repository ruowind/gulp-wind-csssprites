let gulp = require('gulp');
let index = require('./index');

gulp.task('a1', () => {
    return gulp.src('test/src/**/*.css')
        .pipe(index())
        .pipe(gulp.dest('test/dist'));
});