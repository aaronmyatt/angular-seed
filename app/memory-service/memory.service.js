
(function() {
    'use strict';

    angular
        .module('app.bricks', [])
        .service('MemoryService', MemoryService);

    MemoryService.$inject = ["$q"];
    function MemoryService($q) {

        var service = this;

        service.getMemories = getMemories;
        service.saveMemory = saveMemory;

        return service;

        function getMemories() {
            console.log('MemoryService.getMemories');
            return [{
                file: "1.jpg",
                message: "We miss him."
            },
            {
                file: "2.jpg",
                message: "We miss him."
            }]
        }

        function saveMemory(file){
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
    }

})();