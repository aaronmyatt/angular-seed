(function(){

    angular.module('app.routes', ['ngRoute'])
        .config(routeConfig);


    routeConfig.$inject = ['$locationProvider', '$routeProvider'];
    function routeConfig($locationProvider, $routeProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'scripts/index/bricks.html',
                controller: 'IndexController',
                controllerAs: 'vm',
                resolve: {}
            });
    }

})();