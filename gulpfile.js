var gulp = require('gulp');
var plugins = require("gulp-load-plugins")({
  lazy: false
});

gulp.task('scripts', function () {
  //combine all js files of the app
  gulp.src(['!./client/**/*_test.js', './client/**/*.js'])
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'))
    .pipe(plugins.concat('app.js'))
    .pipe(gulp.dest('./build'));
});

gulp.task('templates', function () {
  //combine all template files of the app into a js file
  gulp.src(['!./client/index.html',
        './client/**/*.html'])
    .pipe(plugins.angularTemplatecache('templates.js', {
      standalone: true
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('css', function () {
  gulp.src('./client/**/*.css')
    .pipe(plugins.concat('app.css'))
    .pipe(gulp.dest('./build'));
});

gulp.task('fonts', function () {
  gulp.src('bower_components/roboto-fontface/fonts/*')
    .pipe(gulp.dest('./build/fonts'));
});

gulp.task('assets', function () {
  gulp.src('./client/assets/**/*')
    .pipe(gulp.dest('./build/assets'));
});

gulp.task('vendorJS', function () {
  //concatenate vendor JS files
  gulp.src([
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-aria/angular-aria.js',
    'bower_components/angular-material/angular-material.js'])
    .pipe(plugins.concat('lib.js'))
    .pipe(gulp.dest('./build'));
});

gulp.task('vendorCSS', function () {
  //concatenate vendor CSS files
  gulp.src([
    'bower_components/angular-material/angular-material.css',
      'bower_components/roboto-fontface/roboto-fontface.css'])
    .pipe(plugins.concat('lib.css'))
    .pipe(gulp.dest('./build'));
});

gulp.task('copy-index', function () {
  gulp.src('./client/index.html')
    .pipe(gulp.dest('./build'));
});

gulp.task('watch', function () {

  plugins.express.run(['server/server.js']);

  gulp.watch([
        'build/**/*.html',
        'build/**/*.js',
        'build/**/*.css'
    ], function (event) {
    console.log("**", event);
    plugins.express.notify(event);
  });

  gulp.watch(['./client/**/*.js', '!./client/**/*test.js'], ['scripts']);
  gulp.watch(['!./client/index.html', './client/**/*.html'], ['templates']);
  gulp.watch('./client/**/*.css', ['css']);
  gulp.watch('./client/index.html', ['copy-index']);

  gulp.watch(['server/**/*.js'], [plugins.express.run]);

});

// gulp.task('connect', plugins.connect.server({
//     root: ['build'],
//     port: 9000,
//     livereload: true
// }));

gulp.task('express', function () {
  plugins.express.run('server/server.js');
});

gulp.task('default', ['scripts', 'templates', 'css', 'copy-index', 'vendorJS', 'vendorCSS', 'fonts', 'assets', 'watch']);