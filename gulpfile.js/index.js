/*****************************************************
 * gulp 4.0、CommonJS 寫法 -  引入模組
 * 可輸入指令壓縮執行 --env production
 *****************************************************/
const gulp = require("gulp");
const del = require("del");
const autoprefixer = require("autoprefixer");
const browserSync = require("browser-sync");
const { options } = require("./options");
// const { vendorJS } = require("./vendorJS");

// gulp 管理 gulp-*套件
const $ = require("gulp-load-plugins")();

/*****************************************************
 * 複製檔案 block
 *****************************************************/

function copy() {
  return gulp
    .src([
      "./source/**/**",
      "!source/*.pug",
      "!source/scss/**/**",
      "!source/js/**/**"
    ])
    .pipe(gulp.dest("./public"))
    .pipe(
      $.if(
        options.env === "production",
        browserSync.reload({
          stream: true
        })
      )
    );
}

function copyBsVar() {
  return gulp
    .src("./node_modules/bootstrap/scss/_variables.scss")
    .pipe(gulp.dest("./source/scss/helpers"));
}

/*****************************************************
 * 刪除檔案 block
 *****************************************************/

function clean() {
  return del("./public");
}

/*****************************************************
 * HTML 處理 block
 *****************************************************/

function pug() {
  return gulp
    .src("./source/**/!(_)*.pug")
    .pipe($.plumber())
    // .pipe(
    //   $.data(function () {
    //   const json = require('../source/data/data.json');
    //   const menu = require("../source/data/menu.json");
    //     const source = {
    //       data: json,
    //       menu: menu
    //     };
    //     // console.log(menus);
    //     return source;
    //   })
    // )
    .pipe($.pug({ pretty: true }))
    .pipe(gulp.dest("./public"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
}

/*****************************************************
 * CSS 處理 block
 *****************************************************/

function scss() {
  // postcss 套件使用 processors 前綴詞
  const processors = [autoprefixer()];
  return (
    gulp
      .src(["./source/scss/**/*.sass", "./source/scss/**/*.scss"])
      // 建立 sourcemaps 開始紀錄原始碼位置
      .pipe($.plumber())
      .pipe($.sourcemaps.init())
      // 抓取 bootstrap
      .pipe(
        $.sass({
          outputStyle: "nested",
          includePaths: ["./node_modules/bootstrap/scss"]
        }).on("error", $.sass.logError)
      )
      .pipe($.postcss(processors))
      // 開發環境是 production 執行壓縮 CSS
      .pipe($.if(options.env === "production", $.cleanCss()))
      // 新增.map 寫入 sourcemaps 紀錄
      .pipe($.sourcemaps.write("."))
      .pipe(gulp.dest("./public/css"))
      .pipe(
        browserSync.reload({
          stream: true
        })
      )
  );
}

/*****************************************************
 * JavaScript 處理 block
 *****************************************************/

function babel() {
  return (
    gulp
      .src("./source/**/*.js")
      // 建立 sourcemaps 開始紀錄原始碼位置
      .pipe($.plumber())
      .pipe($.sourcemaps.init())
      .pipe(
        $.babel({
          presets: ["@babel/env"]
        })
      )
      .pipe(
        // 依 MVC 設計模式排序
        $.order([
          "js/data/*.js",
          "js/main.js",
          "js/components/*.js"
        ])
      )
      .pipe($.concat("all.js"))
      .pipe(
        // 開發環境是 production 執行壓縮 Js
        $.if(
          options.env === "production",
          $.uglify({
            compress: {
              drop_console: true
            }
          })
        )
      )
      // 新增.map 寫入 sourcemaps 紀錄
      .pipe($.sourcemaps.write("."))
      .pipe(gulp.dest("./public/js"))
      .pipe(
        browserSync.reload({
          stream: true
        })
      )
  );
}

/*****************************************************
 *  圖片處理 block
 *****************************************************/

function imageMin() {
  return gulp
    .src("./source/images/**")
    .pipe($.if(options.env === "production", $.imagemin()))
    .pipe(gulp.dest("./public/images"));
}

/*****************************************************
 *  伺服器監聽 block
 *****************************************************/

function browserWatch() {
  browserSync.init({
    server: {
      baseDir: "./public",
      reloadDebounce: 2000
    }
  });
  gulp.watch(
    [
      "./source/**/**",
      "!source/**/*.pug",
      "!source/scss/**/**",
      "!source/js/**/**"
    ],
    gulp.series("copy")
  );
  gulp.watch("./source/**/*.pug", gulp.series("pug"));
  gulp.watch(
    ["./source/scss/**/*.sass", "./source/scss/**/*.scss"],
    gulp.series("scss")
  );
  gulp.watch(["./source/js/**/*.js"], gulp.series("babel"));
  console.log("watching (•‾⌣‾•) ~");
}

/*****************************************************
 *  部屬 gh-Pages block
 *****************************************************/

function deploy() {
  return gulp.src("./public/**/*").pipe($.ghPages());
}

/*****************************************************
 *  指令 block
 *****************************************************/

exports.deploy = deploy;
exports.copy = copy;
exports.clean = clean;
exports.copyBsVar = copyBsVar;
exports.pug = pug;
exports.scss = scss;
exports.babel = babel;

exports.build = gulp.series(
  gulp.series(clean, copy),
  gulp.parallel(pug, babel, scss),
  // gulp.series(vendorJS, imageMin)
);

exports.default = gulp.series(
  clean,
  copy,
  gulp.parallel(pug, babel, scss),
  gulp.series(imageMin, browserWatch)
);
