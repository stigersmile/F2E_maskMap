const gulp = require('gulp');
// gulp 管理 gulp-*套件
const $ = require('gulp-load-plugins')();

const vendorJS = function vendorJS(cb) {
  gulp
    .src([
      './node_modules/jquery/dist/jquery.slim.min.js',
      './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
    ])
    .pipe($.concat('vendor.js'))
    .pipe(gulp.dest('./public/js'));
  cb();
};

// exports.vendorJS = vendorJS;
