
(function() {
    'use strict';

    angular
        .module('app.firebase-storage', [])
        .service('FirebaseStorageService', FirebaseStorageService);

    FirebaseStorageService.$inject = ["$q"];
    function FirebaseStorageService($q) {
        var service = this;

        service.getImageFromFileName = getImageFromFileName;
        service.saveFile = saveFile;

        return service;

        function getImageFromFileName(file){
            console.log("_getImageFromFileName_", file);
            return storage.refFromURL('gs://remin-f1785.appspot.com/images/' + file).getDownloadURL();
        }

        function saveFile(file){
            console.log("Uploading file, ", file);
            return storageRef.child('images/' + file.name).put(file);
        }
    }

})();