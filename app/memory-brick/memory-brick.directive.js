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
        vm.limitMessageLength = limitMessageLength;
        vm.image = '';

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
                fullscreen: false,
                bindToController: true,
                locals: {
                    image: vm.memory.ref,
                    memory: vm.memory,
                    user: vm.memory.uploader_name || 'Anonymous'
                }
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

        function limitMessageLength(message){
            if(message.length > 500){
                var limit = message.substr(0, 500);
                return limit + " ..."
            }else{
                return message;
            }
        }


        function init(){
            console.log('_gzMemoryBrickDirective_ init, ', vm);
            getImageUrl(vm.memory);
        }
        init();

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
    }

    DialogController.$inject = ["$scope", "$mdDialog", "$firebaseObject"];
    function DialogController($scope, $mdDialog, $firebaseObject) {
        var memory = firebase.database().ref('memories');

        var vm = this;
        
        vm.hide = hide;
        vm.cancel = cancel;
        vm.answer = answer;
        vm.remove = remove;
        vm.isUploader = isUploader;

        function hide () {
            $mdDialog.hide();
        }
        function cancel () {
            $mdDialog.cancel();
        }
        function answer (answer) {
            $mdDialog.hide(answer);
        }
        function remove () {
            console.log("Removing memory", vm.locals.memory);
            var id = vm.locals.memory.$id;
            var memory = firebase.database().ref('memories/'+id);
            memory = $firebaseObject(memory);
            memory.$loaded().then(function(){
                console.log("Memory loaded:", memory);
                memory.remove = true;
                memory.$save();
                hide();
            });
        }
        function isUploader () {
            return vm.locals.memory.uploader_uid == auth.currentUser.uid;
        }
    }

})();