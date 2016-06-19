var gulp = require('beverage')(require('gulp'), {
    harp: {
        "name": "serve", // the gulp task name
        "help": "harp-serve app & browser-sync",
        "path": "app", // the site's root dir
        "port": 9000,
        "sync": { // passed on to browser-sync
            "proxy": "localhost:9000",
            "open": false,
            "notify": false,
            "reload": [
                "app/**/*"
            ],
            "stream": [ // don't reload the whole page for these ...
                "app/**/*.css"
            ]
        }
    }
});

(function(){
    gulp.task('dev', 'DEVELOP', ['serve', 'style:watch']);
})();


