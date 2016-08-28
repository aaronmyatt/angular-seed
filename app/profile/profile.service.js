
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

    profileService.$inject = ["$firebaseObject"];
    function profileService($firebaseObject) {
        var service = this;

        service.obj = null;
        service.setup = setup;

        return service;

        function setup(uid){
            console.log("Init ProfileService");
            var database = firebase.database().ref('profile/'+uid);
            service.obj = $firebaseObject(database);
        }
    }
})();