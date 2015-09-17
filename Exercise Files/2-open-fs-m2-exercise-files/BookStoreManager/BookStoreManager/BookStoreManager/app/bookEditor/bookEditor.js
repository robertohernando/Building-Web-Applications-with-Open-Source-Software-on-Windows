(function() {
    'use strict';
    var controllerId = 'bookEditor';
    angular.module('app').controller(controllerId,
        ['$scope', 'common', 'model', 'datacontext', bookEditor]);

    function bookEditor($scope, common, model, datacontext) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
        var vm = this;
        vm.book = new model.Book();
        vm.books = [];
        vm.saveNewBook = saveNewBook;
        vm.getBook = getBook;
        vm.getAllBooks = getAllBooks;
        vm.deleteBook = deleteBook;
        activate();

        function activate() {
            var promises = [getAllBooks()];
            common.activateController(promises, controllerId)
                .then(function() { log('Activated Book Editor View'); });
        }

        function saveNewBook() {
        }

        function deleteBook() {

        }

        function getBook() {

        }

        function getAllBooks() {

        }
    }
})();