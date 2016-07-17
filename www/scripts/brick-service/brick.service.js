
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

        return service;

        function getBricks () {
            console.log('BrickService.getBricks');
            return init();

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