var gulp = require('gulp')
  , gutil = require('gulp-util')
  , del = require('del')
  , concat = require('gulp-concat')
  , rename = require('gulp-rename')
  , minifycss = require('gulp-minify-css')
  , minifyhtml = require('gulp-minify-html')
  , processhtml = require('gulp-processhtml')
  , jshint = require('gulp-jshint')
  , uglify = require('gulp-uglify')
  , connect = require('gulp-connect')
  , browserify = require('browserify')
  , watchify = require('watchify')
  , babelify = require('babelify')
  , buffer = require('vinyl-buffer')
  , source = require('vinyl-source-stream')
  , stylish = require('jshint-stylish')
  , exec = require('child_process').exec
  , paths;

// ----------------------------
// Error notification methods
// ----------------------------
var beep = function() {
  var os = require('os');
  var file = 'gulp/error.wav';
  if (os.platform() === 'linux') {
    // linux
    exec("aplay " + file);
  } else {
    // mac
    console.log("afplay " + file);
    exec("afplay " + file);
  }
};

paths = {
  assets: 'src/assets/**/*',
  css:    'src/css/*.css',
  libs:   [
    'src/bower_components/phaser-official/build/custom/phaser-no-physics.min.js'
  ],
  js:     ['src/js/**/*.js'],
  mainJS: './src/js/main.js',
  distJS: './src/build/',
  dist:   './dist/'
};

gulp.task('clean', function (cb) {
  del([paths.dist], cb);
});

gulp.task('copy-assets', ['clean'], function () {
  gulp.src(paths.assets)
    .pipe(gulp.dest(paths.dist + 'assets'))
    .on('error', gutil.log);
});

gulp.task('copy-vendor', ['clean'], function () {
  gulp.src(paths.libs)
    .pipe(gulp.dest(paths.dist))
    .on('error', gutil.log);
});

gulp.task('uglify', ['clean','lint'], function () {
  gulp.src(paths.js)
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.dist))
    .pipe(uglify({outSourceMaps: false}))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('minifycss', ['clean'], function () {
 gulp.src(paths.css)
    .pipe(minifycss({
      keepSpecialComments: false,
      removeEmpty: true
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.dist))
    .on('error', gutil.log);
});

gulp.task('processhtml', ['clean'], function() {
  gulp.src('src/index.html')
    .pipe(processhtml({}))
    .pipe(gulp.dest(paths.dist))
    .on('error', gutil.log);
});

gulp.task('minifyhtml', ['clean'], function() {
  gulp.src('dist/index.html')
    .pipe(minifyhtml())
    .pipe(gulp.dest(paths.dist))
    .on('error', gutil.log);
});

gulp.task('html', function(){
  gulp.src('src/*.html')
    .pipe(connect.reload())
    .on('error', gutil.log);
});

gulp.task('connect', function () {
  connect.server({
    root: [__dirname + '/src'],
    port: 9000,
    livereload: true
  });
});

function compileJS(watch) {
  var bundler = watchify(browserify(paths.mainJS, { debug: true }).transform(babelify));

  function rebundle() {
    bundler.bundle()
      .on('error',function() { beep(); })
      .on('error',gutil.log)
      .pipe(source('build.js'))
      .pipe(buffer())
      .pipe(gulp.dest(paths.distJS))
      .pipe(connect.reload());
  } 

  if( watch ) {
    bundler.on('update', function() {
      console.log('-> bundling...'); 
      rebundle();
    });
  }

  rebundle(); 
}

gulp.task('browserify',function() { compileJS(false); });

gulp.task('watch', function () {
  compileJS(true);
  gulp.watch(['./src/index.html', paths.css ], ['html']);
});

gulp.task('default', ['connect', 'watch']);
gulp.task('build', ['browserify', 'copy-assets', 'copy-vendor', 'uglify', 'minifycss', 'processhtml', 'minifyhtml']);
