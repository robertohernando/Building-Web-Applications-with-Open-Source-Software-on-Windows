(function () {
    'use strict';

    var serviceId = 'datacontext';
    angular.module('app').factory(serviceId,
        ['common', '$http', datacontext]);

    function datacontext(common, $http) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(serviceId);
        var logError = getLogFn(serviceId, 'error');

        var $q = common.$q;
        var baseUrl = "http://localhost:36182/";

        var service = {
            getFeaturedBooks: getFeaturedBooks,
            getMessageCount: getMessageCount,
            saveNewBook: saveNewBook,
            getAllBooks: getAllBooks,
            getBook: getBook,
            deleteBook : deleteBook
        };

        return service;

        function saveNewBook(book) {
            return $http.post(baseUrl + "Book", book)
            .then(
                function(result) {
                    book.id = result.data.id;
                    log("success, saved! " + JSON.stringify(book));
                },
                function(data, status) {
                    logError("New Book Save Failed!");
                }
            )
        }

        function getBook(book) {
            return $http.get(baseUrl + "Book/Title/" + book.title + "?format=json")
                .then(
                    function(result) {
                        book.id = result.data.Id;
                        book.title = result.data.Title;
                        book.author = result.data.Author;
                        book.price = result.data.Price;
                        log("Success, retrieved " + JSON.stringify(book));
                    },
                    function(data, status) {
                        logError("Retrieve book failed.");
                    }
                );
        }
        
        function deleteBook(book) {
            return $http.delete(baseUrl + "Book/" + book.id)
                .then(
                    function (result) {
                        log("Success. Deleted" + JSON.stringify(book));
                    },
                    function (data, status) {
                        logError("Delete book failed!");
                    }
                );
        }

        function getAllBooks() {
            return $http.get(baseUrl + "Book")
                .then(
                    function(results) {
                        log("Success, retrieved all books");
                        return results.data;
                    },
                    function(data, status) {
                        logError("Get all books failed");
                    }            
                );
        }

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