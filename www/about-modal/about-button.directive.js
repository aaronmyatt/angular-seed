(function() {
    'use strict';

    angular
        .module('app.about')
        .directive('gzAboutButton', gzAddMemoryButton);

    function gzAddMemoryButton() {
        return {
            templateUrl: 'about-modal/about-button.html',
            restrict: 'E',
            controller: Controller,
            controllerAs: 'vm',
            scope: {
                // error: '=',
                // formTitle: '@',
                // submitAction: '&'
            }
        };
    }

    Controller.$inject = ["$scope", "$mdDialog", "$mdMedia"];
    function Controller($scope, $mdDialog, $mdMedia) {
        var vm = this;
        vm.ctrl = 'AboutButtonDirectiveController';
        vm.status = '';
        vm.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
        vm.showAboutModal = showAboutModal;

        function showAboutModal(ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && vm.customFullscreen;
            console.log("AboutButton Modal Opened");

            $mdDialog.show({
                controller: DialogController,
                controllerAs: 'vm',
                templateUrl: 'about-modal/about-modal.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: false
            })
                .then(function(answer) {
                    console.log("AboutButton Modal Opened");
                }, function() {
                    console.log("AboutButton Modal Closed");
                });

            $scope.$watch(function() {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function(wantsFullScreen) {
                vm.customFullscreen = (wantsFullScreen === true);
            });
        }
    }

    DialogController.$inject = ["$scope", "$mdDialog", "FirebaseStorageService", "$firebaseArray", "profileService"];
    function DialogController($scope, $mdDialog, FirebaseStorageService, $firebaseArray, profileService) {
        var vm = this;
        vm.ctrl = 'AboutButtonDialogController';

        vm.hide = function () {
            $mdDialog.hide();
        };

        function init(){
            console.log("About Modal init, ");
        }
        init();
    }

})();