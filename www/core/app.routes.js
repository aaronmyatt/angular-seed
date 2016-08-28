(function(){

    angular.module('app')
        .config(routeConfig);

    routeConfig.$inject = ['$locationProvider', '$routeProvider'];
    function routeConfig($locationProvider, $routeProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'core/grid-list.html',
                controller: 'CoreController',
                controllerAs: 'vm',
                resolve: {}
            });
    }
})();