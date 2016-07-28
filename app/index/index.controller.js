// Renders all

(function() {
    'use strict';

    angular
        .module('app')
        .controller('IndexController', IndexController);

    IndexController.$inject = ["$firebaseArray"];
    function IndexController ($firebaseArray) {
        var database = firebase.database().ref('memories');

        var vm = this;
        vm.memories = [];

        function init(){
            console.log('IndexController.init');
            vm.memories = $firebaseArray(database);
        }
        init();
    }

})();
