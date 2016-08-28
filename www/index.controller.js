(function() {
    'use strict';

    angular
        .module('app')
        .controller('IndexController', IndexController);

    IndexController.$inject = ["$scope", "authService", "$location"];
    function IndexController ($scope, authService, $location) {

        var vm = this;
        vm.ctrl = 'IndexController';
        vm.isLoggedIn = false;
        vm.signOut = authService.logout;
        vm.showLoginButton = function(){ return ($location.$$url !== '/login') && !vm.isLoggedIn};
        vm.showRegisterButton = function(){ return ($location.$$url == '/login') };

        function init(){
            console.log('IndexController.init', vm);
        }
        init();

        $scope.$watch(authService.isLoggedIn, function(data){
            console.log("WatchFired::isLoggedIn");
            if (data !== null){
                vm.isLoggedIn = !data.isAnonymous;
            }else{
                vm.isLoggedIn = null;
            }
        });
    }
})();
