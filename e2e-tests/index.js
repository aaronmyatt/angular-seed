'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('index', function() {


  it('should render the index view', function() {
    browser.get('/');
    expect(browser.getLocationAbsUrl()).toMatch("");
    expect(browser.getTitle()).toMatch("Remin: A Place to Remember");
  });

});
