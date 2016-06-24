// Renders all

(function() {
    'use strict';

    angular
        .module('app')
        .controller('IndexController', IndexController);

    IndexController.$inject = []
    function IndexController () {

        this.bricks = [
            "Your item",
            "Your another item",
            "Your another but long item",
            "Your another but very short item",
            "Your one more item",
        ]







        function init(){
            console.log('IndexController.init')
        }
        init();
    }

})();
