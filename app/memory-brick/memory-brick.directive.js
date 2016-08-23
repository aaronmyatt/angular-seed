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

    Controller.$inject = ["FirebaseStorageService", "$scope", "$mdDialog", "$mdMedia"];
    function Controller(FirebaseStorageService, $scope, $mdDialog, $mdMedia) {
        var vm = this;

        vm.status = '  ';
        vm.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

        vm.showAdvanced = showAdvanced;
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

        function showAdvanced(ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && vm.customFullscreen;
            console.log("AddMemory Modal Opened");

            $mdDialog.show({
                controller: DialogController,
                controllerAs: 'vm',
                templateUrl: 'memory-brick/modal.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: useFullScreen,
                bindToController: true,
                locals: {
                    image: vm.memory.ref,
                    message: vm.memory.message}
            })
                .then(function(answer) {
                    console.log("AddMemory Modal Opened");
                }, function() {
                    console.log("AddMemory Modal Closed");
                });

            $scope.$watch(function() {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function(wantsFullScreen) {
                vm.customFullscreen = (wantsFullScreen === true);
            });
        }


        function init(){
            console.log('_gzMemoryBrickDirective_ init, ', vm);
            getImageUrl(vm.memory);
        }
        init();
    }

    DialogController.$inject = ["$scope", "$mdDialog"];
    function DialogController($scope, $mdDialog) {
        var vm = this;

        vm.hide = function () {
            $mdDialog.hide();
        };
        vm.cancel = function () {
            $mdDialog.cancel();
        };
        vm.answer = function (answer) {
            $mdDialog.hide(answer);
        };
    }

})();