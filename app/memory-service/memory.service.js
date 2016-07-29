
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

        function saveMemory(message, file){
            
        }
    }

})();