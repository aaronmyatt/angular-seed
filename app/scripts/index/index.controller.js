// Renders all

(function() {
    'use strict';

    angular
        .module('app')
        .controller('IndexController', IndexController);

    IndexController.$inject = ["BrickService"];
    function IndexController (BrickService) {
        var vm = this;
        vm.bricks = [];

        function init(){
            console.log('IndexController.init');
            console.log(vm);

            BrickService.getBricks().then(function(data){
                console.log('qUrls: ', data);
                vm.bricks = data;
            });
        }
        init();
    }

})();
