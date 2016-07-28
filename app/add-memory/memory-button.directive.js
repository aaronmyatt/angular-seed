(function() {
    'use strict';

    angular
        .module('app.addmemory')
        .directive('gzAddMemoryButton', gzAddMemoryButton);

    function gzAddMemoryButton() {
        return {
            templateUrl: 'add-memory/button.html',
            restrict: 'E',
            controller: Controller,
            controllerAs: 'vm',
            bindToController: true
            // scope: {
            //     error: '=',
            //     formTitle: '@',
            //     submitAction: '&'
            // }
        };
    }

    Controller.$inject = ["$scope", "$mdDialog", "$mdMedia"];
    function Controller($scope, $mdDialog, $mdMedia) {
        var vm = this;
        vm.status = '  ';
        vm.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

        vm.showAdvanced = showAdvanced;

        function showAdvanced(ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && vm.customFullscreen;
            console.log("AddMemory Modal Opened");

            $mdDialog.show({
                controller: DialogController,
                controllerAs: 'vm',
                templateUrl: 'add-memory/modal.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: useFullScreen
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
    }

    DialogController.$inject = ["$scope", "$mdDialog", "MemoryService"];
    function DialogController($scope, $mdDialog, MemoryService) {
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

        vm.submit = function() {
            if ($scope.form.file.$valid && vm.file) {
                console.log("Passing file to _MemoryService_, ", vm.file);
                MemoryService.saveMemory(vm.file);
            }
        };
    }

})();