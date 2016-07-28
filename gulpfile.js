"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var webserver = require("gulp-webserver");

gulp.task("sass", function () {
    return gulp.src("./sass/**/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("./css"));
});

gulp.task("webserver", function() {
    gulp.src(".")
        .pipe(webserver({
            livereload: true,
            directoryListing: true,
            open: true
        }));
});

gulp.task("build", ["sass"]);
