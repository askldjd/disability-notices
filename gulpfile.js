"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var rename = require("gulp-rename");
var handlebars = require("gulp-compile-handlebars");
var inlinesource = require("gulp-inline-source");
var webserver = require("gulp-webserver");
var templateData = require("./data");

gulp.task("sass", function() {
    return gulp.src("./sass/**/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(concat("styles.css"))
        .pipe(gulp.dest("./dist/css/"));
});

gulp.task("hbs", function() {
    var options = {
        partials: {
            "Standard Signature Block": "<br><br><br><p>{{user.deskName}}<br>{{org.phoneNumber}} EXT. {{org.phoneExt}}<br>{{org.faxNumber}} (FAX)</p>"
        },
        batch: ["./partials/"],
        helpers: {
            dateHelperFormat: function (dob) {
                var d = new Date(dob);
                return d.toLocaleDateString();
            },
            current_date: function () {
                var d = new Date();
                return d.toLocaleDateString();
            },
            prompt: function () {
                return "{freeform_text}";
            },
            dateHelperAddDaysToCurrentDate: function (days) {
                var d = new Date();
                d.setDate(d.getDate() + days);
                return d.toDateString();
            },
            cannedText: function () {
                return "{clmt_special_instructions}";
            },
            med_deferment_end_date: function () {
                return "{med_deferment_end_date}";
            },
            manually_enter_med_hold_condition: function () {
                return "{manually_enter_med_hold_condition}";
            },
            clmt_full_name: function () {
                var claimantInfo = templateData.case.claimantInfo;
                return claimantInfo.name.firstName + " " + claimantInfo.name.middleName + " " + claimantInfo.name.lastName;
            },
            clmt_form_return_date: function () {
                var funcs = options.helpers;
                return funcs.dateHelperFormat(funcs.dateHelperAddDaysToCurrentDate(10));
            },
            original_request_date: function () {
                return "{original_request_date}";
            },
            clmt_fu_form_return_date: function () {
                var funcs = options.helpers;
                return funcs.dateHelperFormat(funcs.dateHelperAddDaysToCurrentDate(10));
            },
            clmt_callin_fu_response_date: function () {
                return "{clmt_callin_fu_response_date}";
            },
            clmt_ce_callin_response_date: function () {
                return "{clmt_ce_callin_response_date}";
            },
            age_of_majority: function () {
                return "18";
            },
            clmt_827_return_date: function () {
                var funcs = options.helpers;
                return funcs.dateHelperFormat(funcs.dateHelperAddDaysToCurrentDate(10));
            },
            noteq: function (valOne, valTwo, block) {
                
                if (valOne !== valTwo) {
                    return block.fn(this);
                }

            },
            eq: function (valOne, valTwo, block) {

                if (valOne === valTwo) {
                    return block.fn(this);
                }

            }
        }
    };

    return gulp.src("templates/**/*.hbs")
        .pipe(handlebars(templateData, options))
        .pipe(rename(function(path) {
            path.extname = ".html";
        }))
        .pipe(inlinesource())
        .pipe(gulp.dest("dist"));
});

gulp.task("inlinesource", function() {
    gulp.src("./dist/*.html")
        .pipe(inlinesource())
        .pipe(gulp.dest("out"));
});

gulp.task("webserver", function() {
    gulp.src("dist")
        .pipe(webserver({
            livereload: true,
            directoryListing: {enable: true, path: "./dist/"},
            open: true
        }));
});

gulp.task("watch", ["build"], function () {
    gulp.watch(["./templates/**/*.hbs", "./sass/**/*.scss", "./partials/**/*.hbs"], ["build"]);
});

gulp.task("build", ["sass", "hbs"]);
