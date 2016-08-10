"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var concat = require("gulp-concat");
var rename = require("gulp-rename");
var handlebars = require("gulp-compile-handlebars");
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
            "Standard Signature Block": "<br><br><br><p>{Standard Signature Block}</p>"
        },
        batch: ["./partials/"],
        helpers: {
            dateHelperFormat: function () {},
            prompt: function () {
	    	return "{freeform_text}";
	    },
            dateHelperAddDaysToCurrentDate: function () {},
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
        .pipe(gulp.dest("dist"));
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
