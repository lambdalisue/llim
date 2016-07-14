var gulp = require('gulp-help')(require('gulp'));
var typescript = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var ava = require('gulp-ava');


// Build ---------------------------------------------------------------------
gulp.task('build', 'Build all requirements', [
    'build:ts',
    'build:less',
]);

gulp.task('build:ts', function() {
    var ts = typescript.createProject('./tsconfig.json', {
        typescript: require('typescript'),  // Use typescript in node_modules
    });
    return ts.src()
             .pipe(typescript(ts))
             .pipe(sourcemaps.write('./'))
             .pipe(gulp.dest('./lib'));
});

gulp.task('build:less', function() {
    var source_files = [
        './src/less/**/*.less',
        '!./src/less/includes/**/*.less',
    ];
    return gulp.src(source_files)
               .pipe(less({
                   paths: './src/less/includes',
               }))
               .pipe(gulp.dest('lib/css'));
});

// Test ----------------------------------------------------------------------
gulp.task('test', 'Run test', [
    'test:js',
]);

gulp.task('test:js', ['build:ts'], function() {
    var source_files = [
        './lib/test/**/*.js',
    ];
    gulp.src(source_files)
        .pipe(ava());
});
