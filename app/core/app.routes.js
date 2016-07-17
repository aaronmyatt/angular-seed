(function(){

    angular.module('app')
        .config(routeConfig);


    routeConfig.$inject = ['$locationProvider', '$routeProvider'];
    function routeConfig($locationProvider, $routeProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'index/bricks.html',
                controller: 'IndexController',
                controllerAs: 'vm',
                resolve: {}
            });
    }

})();