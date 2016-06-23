//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: './www',

    files: [
      './test/**/*.js', 
      'app.min.js'
    ],

    autoWatch: true,

    reporters: ['progress'],

    port: 9876,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-junit-reporter'
    ],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
