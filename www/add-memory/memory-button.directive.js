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
                fullscreen: false
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

    DialogController.$inject = ["$scope", "$mdDialog", "FirebaseStorageService", "$firebaseArray", "profileService"];
    function DialogController($scope, $mdDialog, FirebaseStorageService, $firebaseArray, profileService) {
        var vm = this;
        vm.ctrl = 'AddMemoryDialogController';

        vm.memories = [];
        vm.file = '';
        vm.message = '';

        vm.hide = function () {
            $mdDialog.hide();
        };

        vm.saveMemory = function(memory){
            console.log("_saveMemory_", memory);
            vm.memories.$add(memory).then(function(data){
                console.log("Memory added successfully");
                var upload = {}; // So we can evaluate the key name below
                var id = data.key;
                var index = vm.memories.$indexFor(id);
                upload[id] = vm.memories[index].file;
                var obj = profileService.updateUploads(upload);
            });
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
                }, function(success) {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    var downloadURL = uploadTask.snapshot.downloadURL;
                    console.log("Uploadsuccess, ", downloadURL);

                    var memory = {
                        message: vm.message,
                        file: vm.file.name,
                        imageHeight: vm.file.$ngfHeight,
                        imageWidth: vm.file.$ngfWidth,
                        uploader_uid: auth.currentUser.uid,
                        uploader_name: profileService.obj.display_name,
                        timestamp: Date.now(),
                        remove: false
                    };

                    vm.saveMemory(memory);
                    vm.hide();
                });
            }
        };

        function init(){
            var database = firebase.database().ref('memories');
            vm.memories = $firebaseArray(database);
            console.log("Memory button init, ", vm.memories);
        }
        init();
    }

})();