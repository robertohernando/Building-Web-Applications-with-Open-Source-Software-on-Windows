(function () {
    'use strict';

    var serviceId = 'datacontext';
    angular.module('app').factory(serviceId,
        ['common', datacontext]);

    function datacontext(common) {
        var $q = common.$q;

        var service = {
            getFeaturedBooks: getFeaturedBooks,
            getMessageCount: getMessageCount
        };

        return service;

        function getMessageCount() { return $q.when(72); }

        function getFeaturedBooks() {
            var featuredBooks = [
                { title: 'War and Peace', author: 'Tolstoy', price: 25, description: 'Lorem ipsum dolor sit amet, consectetur' },
                { title: 'The Hours', author: 'Cunningham', price: 17, description: 'adipisicing elit. Hic, ' },
                { title: 'The Trial', author: 'Kafka', price: 21, description: 'impedit repellat itaque nam voluptatem' },
                { title: 'Neuromancer', author: 'Gibson', price: 18, description: 'ab necessitatibus similique' },
                { title: 'Snow Crash', author: 'Stephenson', price: 18, description: 'dignissimos architecto iste' },
                { title: 'Goedel, Escher, Bach', author: 'Hofstadter', price: 31, description: 'repellendus vero impedit explicabo' },
                { title: "Darwin's Dangerous Idea", author: 'Dennett', price: 35, description: 'fuga mollitia repudiandae' }
            ];
            return $q.when(featuredBooks);
        }
    }
})();