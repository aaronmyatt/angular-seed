(function() {
    'use strict';

    angular
        .module('app')
        .controller('CoreController', CoreController);

    CoreController.$inject = ["$firebaseArray"];
    function CoreController ($firebaseArray) {
        var database = firebase.database().ref('memories');

        var vm = this;

        vm.memories = [];

        function init(){
            console.log('CoreController.init', vm);
            vm.memories = $firebaseArray(database);
        }
        init();
    }
})();
