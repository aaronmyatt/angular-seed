(function() {
    'use strict';

    angular
        .module('app')
        .factory('firebaseDataService', firebaseDataService);

    firebaseDataService.$inject = [];

    function firebaseDataService() {

        var root = firebase.database().ref();

        var service = {
            root: root,
            users: root.child('users')
        };

        return service;
    }

})();
