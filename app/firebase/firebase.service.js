(function() {
    'use strict';

    angular
        .module('app')
        .factory('firebaseDataService', firebaseDataService);

    firebaseDataService.$inject = ['FIREBASE_URL'];

    function firebaseDataService(FIREBASE_URL) {

        var root = Firebase.database().ref();

        var service = {
            root: root,
            users: root.child('users'),
            // emails: root.child('emails'),
            // textMessages: root.child('textMessages')
        };

        return service;
    }

})();
