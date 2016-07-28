(function() {
    'use strict';

    angular
        .module('app.memory-brick')
        .directive('gzMemoryBrickDirective', gzMemoryBrickDirective);

    function gzMemoryBrickDirective() {
        return {
            templateUrl: 'memory-brick/memory-brick.html',
            restrict: 'E',
            replace: true,
            controller: Controller,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                memory: '='
            }
        };
    }

    Controller.$inject = ["FirebaseStorageService", "$scope"];
    function Controller(FirebaseStorageService, $scope) {
        var vm = this;

        vm.image = '';

        function getImageUrl(memory){
            FirebaseStorageService.getImageFromFileName(memory.file)
                .then(success)
                .catch(error);

            function success(data){
                console.log("_SUCCESS_", vm);
                vm.memory.ref = data;
                $scope.$apply();
            }

            function error(e){
                console.log("_ERROR_", e);
            }
        }

        function init(){
            console.log('_gzMemoryBrickDirective_ init, ', vm);
            getImageUrl(vm.memory);
        }
        init();
    }

    DialogController.$inject = [];
    function DialogController() {
        var vm = this;
    }

})();