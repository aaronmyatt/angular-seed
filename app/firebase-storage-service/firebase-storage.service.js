
(function() {
    'use strict';

    angular
        .module('app.firebase-storage', [])
        .service('FirebaseStorageService', FirebaseStorageService);

    FirebaseStorageService.$inject = ["$q"];
    function FirebaseStorageService($q) {
        var service = this;

        service.getImageFromFileName = getImageFromFileName;

        return service;

        function getImageFromFileName(file){
            console.log("_getImageFromFileName_", file);
            return storage.refFromURL('gs://remin-f1785.appspot.com/' + file).getDownloadURL();
        }
    }

})();