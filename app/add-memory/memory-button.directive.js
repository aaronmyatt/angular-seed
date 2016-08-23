(function() {
    'use strict';

    angular
        .module('app.addmemory')
        .directive('gzAddMemoryButton', gzAddMemoryButton);

    function gzAddMemoryButton() {
        return {
            templateUrl: 'add-memory/memory-button.html',
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

    Controller.$inject = ["$scope", "$location", "$mdDialog", "$mdMedia"];
    function Controller($scope, $location, $mdDialog, $mdMedia) {
        var vm = this;
        vm.ctrl = 'AddMemoryDirectiveController';
        vm.status = '';
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

    DialogController.$inject = ["$scope", "$mdDialog", "FirebaseStorageService", "$firebaseArray"];
    function DialogController($scope, $mdDialog, FirebaseStorageService, $firebaseArray) {
        var vm = this;
        vm.ctrl = 'AddMemoryDialogController';
        var database = firebase.database().ref('memories');

        vm.memories = [];
        vm.file = '';
        vm.message = '';


        vm.saveMemory = function (memory){
            console.log("_saveMemory_", memory);
            vm.memories.$add(memory);
        };
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
                var uploadTask = FirebaseStorageService.saveFile(vm.file);

                uploadTask.on('state_changed', function(snapshot){
                    // Observe state change events such as progress, pause, and resume
                    // See below for more detail
                }, function(error) {
                    // Handle unsuccessful uploads
                    console.log("Upload error, ", error);
                }, function(s) {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    var downloadURL = uploadTask.snapshot.downloadURL;
                    console.log("Uploadsuccess, ", downloadURL);

                    vm.saveMemory({
                        message: vm.message,
                        file: vm.file.name,
                        imageHeight: vm.file.$ngfHeight,
                        imageWidth: vm.file.$ngfWidth,
                        user: auth.currentUser.uid,
                        timestamp: firebase.database.ServerValue.TIMESTAMP
                    });
                });
            }
        };

        function init(){
            console.log('AddMemory Dialog.init', database);
            vm.memories = $firebaseArray(database);
        }
        init();
    }

})();