/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. 
*/

var gulp = require('gulp'),
    notify = require('gulp-notify')
    inject = require('gulp-inject'),
    concat = require('gulp-concat'),
    print = require('gulp-print'),
    angularFilesort = require('gulp-angular-filesort'),
    uglify = require('gulp-uglify'),
    del = require('del'),
    minifyCSS = require('gulp-minify-css'),
    copy = require('gulp-copy'),
    tsc = require('gulp-typescript'),
    tslint = require('gulp-tslint'),
    //uibs = require('angular-bootstrap');
    //browserSync = require('browser-sync'),
    //imagemin = require('gulp-imagemin'),

//gulp configuration
Config = require('./gulpfile.config.js');

var config = new Config();

/**
 * Lint all custom TypeScript files.
 */
//gulp.task('ts-lint', function () {
//    return gulp.src(config.allTypeScript).pipe(tslint()).pipe(tslint.report('prose'));
//});


//bower install...
gulp.task('bower-task', function () {

    return bower()
        .pipe(gulp.dest(config.bowerDir))
})

gulp.task('css', function () {

    var customCssStream = gulp.src([config.bowerDir + '/bootstrap/dist/css/bootstrap.css',
                                    config.bowerDir + '/bootstrap/dist/css/bootstrap-theme.css',
                                    config.bowerDir + '/angular-bootstrap/ui-bootstrap.csp.css',
                                    config.bowerDir + '/angular-ui/build/angular-ui.css',
                                    //config.bowerDir + '/bootstrap-material-design/dist/css/bootstrap-material-design.min.css',
                                    //config.bowerDir + '/bootstrap-material-design/dist/ripples/ripples.css',
                                    config.bowerDir + '/angular-material/angular-material.css',
                                    //config.bowerDir + '/https://fonts.googleapis.com/icon?family=Material+Icons',
                                    config.bowerDir + '/fontawesome/scss',
                                    './Styles/site.css',

    ]);

    /*
     * We define the source file(s) and pass in any options, using gulp.src()...
     * It also can be a glob pattern, to match multiple files
     * We use .pipe() to pipe the source file(s) into a plugin.
     * Pipes are chainable so you can add as many plugins as you need to the stream.
     * 
     * We then minify the css
     * Concat to a new name
     * We set the destination using gulp.dest and Save the file to here, a file can have multiple destinations to save expanded and minimised versions
     * Update the script blocks in the html using the inject as a wrapper, then
     * Finally notify the task is complete
     * 
     * By returning the stream it makes it asynchronous
     */

    var target = gulp.src(config.targetViewsDir);
    return target
        .pipe(inject(
            customCssStream.pipe(print())
            .pipe(concat('appStyles.css'))
            .pipe(minifyCSS())
            .pipe(concat('appStyles.min.css'))
            .pipe(gulp.dest('.build/css')), { name: 'styles' })
            )
            .on("error", notify.onError(function (error) {
                return "Error: " + error.message;
            }))
        .pipe(gulp.dest('./views/home/'))
        .pipe(notify({ message: 'Css -task complete' })
        );
});

gulp.task('vendors-scripts', function () {

    var vendorStream = gulp.src([
            config.bowerDir + '/angular-material/angular-material.js',
  
            config.bowerDir + '/angular-bootstrap/ui-bootstrap.js',
            config.bowerDir + '/angular-bootstrap/ui-bootstrap-tpls.js',

            config.bowerDir + '/angular-resource/angular-resource.js',
            config.bowerDir + '/angular-animate/angular-animate.js',
            config.bowerDir + '/angular-loader/angular-loader.js',
            config.bowerDir + '/angular-aria/angular-aria.js',
            config.bowerDir + '/angular-cookies/angular-cookies.js',
            config.bowerDir + '/angular-message-format/angular-message-format.js',
            config.bowerDir + '/angular-messages/angular-messages.js',

            config.bowerDir + '/angular-route/angular-route.js',
            config.bowerDir + '/angular/angular.js',

            config.bowerDir + '/bootstrap/dist/js/bootstrap.js',
                //config.bowerDir + '/bower_components/material-design-lite/ripples.min.js',
                //config.bowerDir + '/bootstrap-material-design/dist/js/ripples.js',
                //config.bowerDir + '/bootstrap-material-design/dist/js/material.js',
            //config.bowerDir + '/bower_components/material-design-lite/ripples.min.js',

            config.bowerDir + '/jquery/dist/jquery.js',
    ]);

    /*
     * The Plugins being used are described in their own README files
     * You can see in the README files for the plugins that they’re pretty easy 
     * to use; options are available, but the defaults are usually good enough.
     * 
     * UglifyJS() is a JavaScript parser/compressor/beautifier toolkit. It can be used to combine and minify JavaScript 
     * assets so that they require less HTTP requests and make your site load faster
     * 
     * You might have noticed that the JSHint plugin is called twice. That’s because the first line runs JSHint on the files,
     * which only attaches a jshint property to the file objects without outputting anything. 
     * You can either read the jshint property yourself or pass it to the default JSHint reporter
     * 
     * The other two plugins are clearer: the uglify() function minifies the code, 
     * and the concat('app.js') function concatenates all of the files into a single file named app.js.
     * 
     * When coding in angularJS it’s very important to inject files in the right order. 
     * This is why we used a Gulp plugin named gulp-angular-filesort.
     * 
     */

    var target = gulp.src(config.targetViewsDir);
    return target
        .pipe(inject(
            vendorStream.pipe(print())
            //.pipe(tslint())
            //.pipe(tslint.report('prose'))
            //.pipe(jshint())
            //.pipe(jshint.reporter('default'))

            .pipe(angularFilesort())
            .pipe(concat('vendors.js'))
            //.pipe(rename({ suffix: '.min' }))
            //.pipe(uglify())
            .pipe(gulp.dest('.build/vendors')), { name: 'vendors' })
            )
            .on("error", notify.onError(function (error) {
                return "Error: " + error.message;
            }))
        .pipe(gulp.dest('./Views/Home/'))
        .pipe(notify({ message: 'Vendors-task complete' }))
});

gulp.task('spa-scripts', function () {

    var appStream = gulp.src(['./app/*.js', './app/common/services/*.js', './app/domain/*.js', './app/customers/*.js']);

    var target = gulp.src(config.targetViewsDir);
    return target
        .pipe(inject(
            appStream.pipe(print())
                //.pipe(tslint())
                //.pipe(tslint.report('prose'))
                //.pipe(jshint())
                //.pipe(jshint.reporter('default'))
                .pipe(concat('app.js'))
                 //.pipe(rename({ suffix: '.min' }))
                .pipe(uglify())
                .pipe(gulp.dest('.build/spa')), { name: 'app' })
                )
                .on("error", notify.onError(function (error) {
                    return "Error: " + error.message;
                }))
            .pipe(gulp.dest('./views/home/'))
            .pipe(notify({ message: 'Spa-scripts task complete' }))

});


////Font-awesome install
gulp.task('fonts', function () {

    var src = gulp.src(config.bowerDir + '/bootstrap/dist/fonts/**/*.*',                     config.bowerDir + '/font-awesome/fonts/**/*.*')

    return src         .pipe(print())         .pipe($.flatten())         .pipe(gulp.dest('./build/fonts'))
        .pipe(notify({ message: 'Fonts task complete' }));

});


// Images Compression
gulp.task('images', function () {

    var imagesStream = './Styles/Images/*.{png,jpg,jpeg,gif}';

    /*
     * Take any source images and run them through the imagemin plugin
     * 
     * We can go a little further and utilise caching to save re-compressing already compressed 
     * images each time this task runs. All we need is the gulp-cache plugin
     * e.g. .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
     * Only new or changed images will be compressed. Neat!
     */

    return gulp.src(imagesStream)
            .pipe(print())
            //.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
            //Save optimised image files
             //.pipe(gulp.dest('./Styles/Images/')), { name: 'images' })
            .pipe(gulp.dest('.build/images'))
            .pipe(notify({ message: 'Images-task complete' }))
});

// Clean
gulp.task('clean', function () {
    return del(['.build/css', '.build/vendors', '.build/spa', '.build/images']);
});

//gulp.task('default', ['bower-task', 'css', 'fonts', 'vendors-scripts', 'spa-scripts']);
gulp.task('default', ['css', 'vendors-scripts', 'spa-scripts', 'images', 'fonts']);

// Watch and reload in Browser if they change
gulp.task('watch', function () {

    // Watch .scss files
    //gulp.watch('src/styles/**/*.css', ['styles']);

    // Watch .js files
    //gulp.watch('src/scripts/**/*.js', ['scripts']);

    // Watch image files
    //gulp.watch('src/images/**/*', ['images']);

    // Create LiveReload server
    //livereload.listen();

    // Watch any files in dist/, reload on change
    //gulp.watch(['.build/**']).on('change', livereload.changed);

});


// Synchronously delete the output style files (css / fonts)
//gulp.task('clean-styles', function (cb) {
//    del([config.fontsout,
//              config.cssout], cb);
//});

// Synchronously delete the output script file(s)
//gulp.task('clean-vendor-scripts', function (cb) {
//    del([config.jquerybundle,
//              config.bootstrapbundle,
//              config.modernizrbundle], cb);
//});


////Font-awesome install
//gulp.task('fonts', function () {

//    return gulp.src(config.bowerDir + '/bootstrap/dist/fonts/*.*', //                    config.bowerDir + '/font-awesome/fonts/*.*') //        .pipe($.flatten()) //        .pipe(gulp.dest('./build/fonts'));

//});