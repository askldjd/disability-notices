"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var rename = require("gulp-rename");
var handlebars = require("gulp-compile-handlebars");
var webserver = require("gulp-webserver");

gulp.task("sass", function() {
    return gulp.src("./sass/**/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(concat("./dist/css"));
});

gulp.task("hbs", function() {
    var templateData = {};
    var options = {
        partials: {
            "Standard Signature Block": ""
        },
        helpers: {
            dateHelperFormat: function () {},
            eq: function () {},
            prompt: function () {},
            dateHelperAddDaysToCurrentDate: function () {},
            cannedText: function () {}
        }
    };

    return gulp.src("templates/**/*.hbs")
        .pipe(handlebars(templateData, options))
        .pipe(rename(function(path) {
            path.extname = ".html";
        }))
        .pipe(gulp.dest("dist"));
});

gulp.task("webserver", function() {
    gulp.src("dist")
        .pipe(webserver({
            livereload: true,
            open: true
        }));
});

gulp.task("build", ["sass", "hbs"]);
