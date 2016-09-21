/**
 * Created by hasee on 2016/7/5.
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var webserver = require("gulp-webserver");

/*开启有一个服务器*/
gulp.task("webserver",function(){
    gulp.src("./")
        .pipe(webserver({
            livereload: true, /*修改文件自动刷新*/
            directoryListing: {  /*要不要显示目录，开发环境下可以显示*/
                enable:true,
                path: './'  /*有哪个目录下开始访问*/
            },
            port: 8080, /*端口号*/
            host: 'localhost'
        }))
});
//编辑scss文件
gulp.task("styles",function(){
    gulp.src("src/sass/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css/"))
});
//编辑css基础文件
gulp.task("stylesLibcss",function(){
    gulp.src("src/sass/lib/*.css")
        .pipe(sass())
        .pipe(gulp.dest("app/css/lib/"))
});
//编辑HTML下的html
gulp.task("copyHtml",function(){
    gulp.src("src/html/*.html")
        .pipe(gulp.dest("app/html/"))
});
//编辑src下的html
gulp.task("html",function(){
    gulp.src("src/*.html")
        .pipe(gulp.dest("app/"))
});
//编辑js文件
gulp.task("copyJs",function(){
    gulp.src("src/js/*.js")
        .pipe(gulp.dest("app/js/"))
});
//编辑js基础文件
gulp.task("copyLibjs",function(){
    gulp.src("src/js/lib/*.js")
        .pipe(gulp.dest("app/js/lib/"))
});
//压缩文件
gulp.task('images', function () {
    gulp.src('src/images/*.+(jpeg|jpg|png)')
        .pipe(imagemin())
        .pipe(gulp.dest('app/images/'));
});
//执行监听看守任务
gulp.task("watch",function(){
    gulp.watch("src/sass/*.scss",["styles"]);
    gulp.watch("src/html/*.html",["copyHtml"]);
    gulp.watch("src/*.html",["html"]);
    gulp.watch("src/js/*.js",["copyJs"]);

});
//执行默认任务
gulp.task("default",["styles","watch","html","copyHtml","images","webserver","copyLibjs","copyJs","stylesLibcss"]);