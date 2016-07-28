(function() {
    'use strict';

    angular
        .module('app.memory-brick')
        .directive('gzMemoryBrickDirective', gzMemoryBrickDirective);

    function gzMemoryBrickDirective() {
        return {
            templateUrl: 'memory-brick/memory-brick.html',
            restrict: 'E',
            controller: Controller,
            controllerAs: 'vm',
            bindToController: true,
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

        vm.showAdvanced = function(ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && vm.customFullscreen;

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
                    vm.status = 'You said the information was "' + answer + '".';
                }, function() {
                    vm.status = 'You cancelled the dialog.';
                });

            $scope.$watch(function() {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function(wantsFullScreen) {
                vm.customFullscreen = (wantsFullScreen === true);
            });
        };
    }

    DialogController.$inject = ["$scope", "$mdDialog", "BrickService"];
    function DialogController($scope, $mdDialog, BrickService) {
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
                console.log("Passing file to _BrickService_, ", vm.file);
                BrickService.uploadBrick(vm.file);
            }
        };
    }

})();