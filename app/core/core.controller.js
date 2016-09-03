(function() {
    'use strict';

    angular
        .module('app')
        .controller('CoreController', CoreController);

    CoreController.$inject = ["$scope", "$firebaseArray", "authService"];
    function CoreController ($scope, $firebaseArray, authService) {
        var vm = this;
        vm.ctrl = 'CoreController';

        vm.memories = [];

        function init(){
            console.log('CoreController.init', vm);
            var database = firebase.database().ref('memories').orderByChild('remove').equalTo(false);
            vm.memories = $firebaseArray(database);
        }
        init();
    }
})();
