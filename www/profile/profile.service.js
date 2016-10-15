
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
                profileService.setup(authData);
            }
        });
    };

    profileService.$inject = ["$firebaseObject", "$firebaseArray"];
    function profileService($firebaseObject, $firebaseArray) {
        var service = this;

        service.obj = null;
        service.uploads = null;
        service.createProfile = createProfile;
        service.updateUploads = updateUploads;
        service.updateDisplayName = updateDisplayName;
        service.setup = setup;

        return service;

        function createProfile(user){
            var emailBeforeAtSign = user.email.slice(0, user.email.lastIndexOf('@'));
            var obj = service.updateDisplayName(emailBeforeAtSign);
        }

        function updateUploads(upload){
            return service.uploads.$add(upload);
        }
        
        function updateDisplayName(name) {
            service.obj.display_name = name;
            return service.obj.$save();
        }
        
        function setup(user){
            var uid = user.uid;
            var profile = firebase.database().ref('profile/'+uid);
            var uploads = firebase.database().ref('profile/'+uid+'/uploads');
            service.obj = $firebaseObject(profile);
            service.uploads = $firebaseArray(uploads);
            console.log("Init ProfileService", service.obj);
            if (service.obj.display_name == undefined) {
                service.createProfile(user);
            }
        }
    }
})();