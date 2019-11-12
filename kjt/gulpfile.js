let gulp = require("gulp");
let connect = require("gulp-connect");
let concat = require("gulp-concat");
let uglify = require("gulp-uglify");
let rename = require("gulp-rename");
let babel = require("gulp-babel");
let proxy = require("http-proxy-middleware");
let sass = require("gulp-sass");

// console.log(gulp);
// 将开发环境中的文件复制到上线环境中，开启服务器，浏览器自动刷新

// 转存
// 转存各种文件的路径写法
gulp.task("sass", () => {
    return gulp.src("css/sass/*.scss")//sass所在文件
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("css"))//转存到目标文件夹
        .pipe(connect.reload());//自动刷新
})

// 开启监听，监听文件，发生保存时，自动执行指定命令
gulp.task("listen",()=>{
    // gulp.watch("src/ly.html",["abc"]);
    gulp.watch("css/sass/*.scss",["sass"]);
})

// sass转css的命令
gulp.task("sass",()=>{
    gulp.src("css/sass/*.scss")
        .pipe(sass().on("error",sass.logError))
        .pipe(gulp.dest("css"));
})





































// // let gulp=require("gulp");
// // // console.log(gulp);
// // //将开发环境的文件复制到上线环境中,开启服务器,浏览器自动刷新

// // //转存
// //     // gulp.task("name",cb)
// //     //         //     ↑     ↑
// //     //         // 命名
// //     //测试命令
// //     // gulp.task("hello",()=>{
// //     //     console.log("hello")
// //     // })

// //     //转存:原文件必须真实存在,转存的可以通过命令来创建
// //     gulp.task("abc",()=>{
// //         gulp.src("src/ly.html").pipe(gulp.dest("server"));
// //     })

// // // 多层嵌套*/*
// // // 所有*
// // // 格式{txt,html}
// // // 除了!

// // //开启监听,监听文件保存时自动执行命令
// //     watch("路径",["命令"])

// //
// // task:定义命令
// // task("name",cb)
// // src:查找文件
// // pipe:连缀
// // dest:转存
// // watch:监听


// // let gulp=require("gulp")
// // console.log(gulp)
// // gulp.task("hello",()=>{
// //     console.log("666")
// // })
// // gulp.task("abc",()=>{
// //     gulp.src("src/ly.html").pipe(gulp.dest("server"))

// // })

// // gulp.task("abc1",()=>{
// //     gulp.src("src/ly1.css").pipe(gulp.dest("server"))

// // })

// let gulp=require("gulp");
// // gulp.task("abc",()=>{
// //     console.log("task命令")
// // })

// // //转存:1.单个文件
// gulp.task("abc",()=>{
// gulp.src("src/c.css").pipe(gulp.dest("srccopy"))
// })
//     //2.多个文件:接收数组,数组里放多个文件路径
//     // gulp.task("abc",()=>{
//     //     gulp.src(["src/c.css","src/h.html"]).pipe(gulp.dest("srccopy"))
//     // })
//     //3.文件夹下全部文件:路径后加*
//     // gulp.task("abc",()=>{
//     //     gulp.src("src/*").pipe(gulp.dest("srccopy"))
//     // })
//     //4.某种文件类型:路径后加 *{类型1,类型2}
//     //   gulp.task("abc",()=>{
//     //     gulp.src("src/*{html,css}").pipe(gulp.dest("srccopy"))
//     // })
//     //5.1除了某个文件,多个路径在[]中,路径前加!
//     //   gulp.task("abc",()=>{
//     //     gulp.src(["src/*","!src/c.css"]).pipe(gulp.dest("srccopy"))
//     // })
//     //5.2.多层文件夹嵌套:*/*
//     //   gulp.task("abc",()=>{
//     //     gulp.src(["src/**/*.css"]).pipe(gulp.dest("srccopy"))
//     // })
    
//    // 监听

//     gulp.task("listen",()=>{
//         gulp.watch("src/c.css",["abc"])
//     })