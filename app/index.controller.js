(function() {
    'use strict';

    angular
        .module('app')
        .controller('IndexController', IndexController);

    IndexController.$inject = ["$scope", "authService", "$location", "RoundFilter"];
    function IndexController ($scope, authService, $location, RoundFilter) {

        var vm = this;
        vm.ctrl = 'IndexController';
        vm.isLoggedIn = false;
        vm.signOut = authService.logout;
        vm.showLoginButton = function(){ return ($location.$$url !== '/login') && !vm.isLoggedIn};
        vm.showRegisterButton = function(){ return ($location.$$url == '/login') };
        vm.determineHeight = determineHeight;

        function determineHeight(memory){
            console.log("determineHeight", memory);
            if(memory.imageHeight > 300){
                return 2;
            }
            return 1;
        }

        function init(){
            console.log('IndexController.init', vm);
        }
        init();

        $scope.$watch(authService.isLoggedIn, function(data){
            console.log("WatchFired::isLoggedIn");
            if (data !== null){
                vm.isLoggedIn = !data.isAnonymous;
                $location.path('/');
            }else{
                vm.isLoggedIn = null;
            }
        });
    }
})();
