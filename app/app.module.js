require('../node_modules/angular/angular.js');
require('../node_modules/angular-route/angular-route');

angular.module('app', [
        'ngRoute'
    ]).
    config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');
}]);

