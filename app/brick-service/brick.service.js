
(function() {
    'use strict';

    angular
        .module('app.bricks', [])
        .service('BrickService', BrickService);

    BrickService.$inject = ["$q"]
    function BrickService($q) {
        var preBrick = [
            storage.refFromURL('gs://remin-f1785.appspot.com/1.jpg'),
            storage.refFromURL('gs://remin-f1785.appspot.com/2.jpg'),
            storage.refFromURL('gs://remin-f1785.appspot.com/3.jpg'),
            storage.refFromURL('gs://remin-f1785.appspot.com/4.jpg'),
            storage.refFromURL('gs://remin-f1785.appspot.com/5.jpg')
        ];
        var service = this;

        service.getBricks = getBricks;
        service.uploadBrick = uploadBrick;

        return service;

        function getBricks () {
            console.log('BrickService.getBricks');
            return init();

        }

        function uploadBrick(file){
            console.log("Uploading file, ", file);

            var uploadTask = storageRef.child('images/' + file.name).put(file);
            // uploadTask.on('state_changed', function(snapshot){
            //     // Observe state change events such as progress, pause, and resume
            //     // See below for more detail
            // }, function(error) {
            //     // Handle unsuccessful uploads
            //     console.log("Upload error, ", error);
            // }, function(s) {
            //     console.log("Uploadsuccess, ", s);
            //     // Handle successful uploads on complete
            //     // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            //     var downloadURL = uploadTask.snapshot.downloadURL;
            // });
        }

        function init() {
            var qUrls = [];
            preBrick.forEach(function (preUrl) {
                qUrls.push(preUrl.getDownloadURL());
            });
            return $q.all(qUrls);
        }
    }

})();