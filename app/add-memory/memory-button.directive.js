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
                // controller: DialogController,
                template: '<h1>Opened</h1>',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
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

})();