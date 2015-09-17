(function() {
    'use strict';

    var serviceId = 'datacontext';
    angular.module('app').factory(serviceId,
        ['common', '$http', 'entityManagerFactory', datacontext]);

    function datacontext(common, $http, entityManagerFactory) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(serviceId);
        var logError = getLogFn(serviceId, 'error');
        var booksAreInCache = false;

        var $q = common.$q;
        var baseUrl = "http://localhost:64265/";
        var manager = entityManagerFactory.newManager();
        var service = {
            deleteBook: deleteBook,
            getBook: getBook,
            getArrayOfBooks: getArrayOfBooks,
            getAllBooks: getAllBooks,
            getMessageCount: getMessageCount,
            saveNewBook: saveNewBook          
        };

        return service;




        function getMessageCount() { return $q.when(72); }

        function getBook(book) {
            return $http.get(baseUrl + "Book/Title/"+book.title+ "?format=json" )
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

        function saveNewBook(book) {
            return $http.post(baseUrl + "Book", book)
                .then(
                    function(result) {
                        book.id = result.data.Id;
                        log("success, saved: " + JSON.stringify(book));
                    },
                    function(data, status) {
                        logError(data || "New Book Save Failed");
                    }
                );
        }
        
        function deleteBook(book) {
            return $http.delete(baseUrl + "Book/" + book.id)
                .then(
                    function(result) {
                        log("Success. Deleted" + JSON.stringify(book));
                    },
                    function(data, status) {
                        logError(data || "Delete book failed!");
                    }
                );
        }
        
        function getAllBooks(forceRefresh) {
            var query = breeze.EntityQuery.from("Book").using(manager);
            if (booksAreInCache && !forceRefresh) {
                var fromCache = true;
                query = query.using(breeze.FetchStrategy.FromLocalCache);
            }
            return query.execute().to$q(
                    function (data) {
                        log("Success, retrieved all books " + (fromCache ? "from cache" : "from server"));
                        booksAreInCache = true;
                        return data.results;
                    },
                    function (error) {
                        logError("Get all books failed: " + error.message);
                    }
                );
        }




        function getArrayOfBooks() {
            var books = [
                { title: 'War and Peace', author: 'Tolstoy', price: 25, description: 'Lorem ipsum dolor sit amet, consectetur' },
                { title: 'The Hours', author: 'Cunningham', price: 17, description: 'adipisicing elit. Hic, ' },
                { title: 'The Trial', author: 'Kafka', price: 21, description: 'impedit repellat itaque nam voluptatem' },
                { title: 'Neuromancer', author: 'Gibson', price: 18, description: 'ab necessitatibus similique' },
                { title: 'Snow Crash', author: 'Stephenson', price: 18, description: 'dignissimos architecto iste' },
                { title: 'Goedel, Escher, Bach', author: 'Hofstadter', price: 31, description: 'repellendus vero impedit explicabo' },
                { title: "Darwin's Dangerous Idea", author: 'Dennett', price: 35, description: 'fuga mollitia repudiandae' }
            ];
            return $q.when(books);
        } 
        
    } 
})();