(function(){

    angular.module('app.routes', ['ngRoute'])

        .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'scripts/index/bricks.html',
                    controller: 'IndexController',
                    controllerAs: 'vm',
                    // resolve: {
                    //     // I will cause a 1 second delay
                    //     delay: function($q, $timeout) {
                    //         var delay = $q.defer();
                    //         $timeout(delay.resolve, 1000);
                    //         return delay.promise;
                    //     }
                    // }
                })
                .when('/Book/:bookId/ch/:chapterId', {
                    templateUrl: 'chapter.html',
                    controller: 'ChapterController'
                });
        }]);

})();