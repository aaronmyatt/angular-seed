'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('index', function() {

  var EC = protractor.ExpectedConditions;

  beforeEach(function () {
    browser.get('/');
  });

  it('should render the index view', function() {
    expect(browser.getLocationAbsUrl()).toMatch("");
    expect(browser.getTitle()).toMatch("Remin: A Place to Remember");
  });

  it('displays bricklayer divs', function(){
    browser.pause();
    var bricks = element(by.css('.bricklayer'));
    expect(bricks.count).toBe(5);
  });

});
