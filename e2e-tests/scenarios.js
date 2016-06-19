'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('index', function() {


  it('should automatically redirect to /view1 when location hash/fragment is empty', function() {
    browser.get('/');
    expect(browser.getLocationAbsUrl()).toMatch("/");
  });

});
