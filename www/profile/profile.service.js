
(function() {
    'use strict';

    angular
        .module('app.profile', [])
        .service('profileService', profileService)
        .run(runFunction);

    runFunction.$inject = ['profileService', '$firebaseAuth'];

    function runFunction(profileService, $firebaseAuth) {
        var firebaseAuthObject = $firebaseAuth();

        firebaseAuthObject.$onAuthStateChanged(function(authData) {
            if (authData) {
                console.log("Setup Profile Service");
                profileService.setup(authData.uid);
            }
        });
    };

    profileService.$inject = ["$firebaseObject", "$firebaseArray"];
    function profileService($firebaseObject, $firebaseArray) {
        var service = this;

        service.obj = null;
        service.uploads = null;
        service.updateUploads = updateUploads;
        service.setup = setup;

        return service;

        function updateUploads(upload){
            return service.uploads.$add(upload);
        }

        function setup(uid){
            console.log("Init ProfileService");
            var profile = firebase.database().ref('profile/'+uid);
            var uploads = firebase.database().ref('profile/'+uid+'/uploads');
            service.obj = $firebaseObject(profile);
            service.uploads = $firebaseArray(uploads);
        }
    }
})();