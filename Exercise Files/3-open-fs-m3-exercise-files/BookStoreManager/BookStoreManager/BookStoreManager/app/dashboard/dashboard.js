(function () {
    'use strict';
    var controllerId = 'dashboard';
    angular.module('app').controller(controllerId, ['common', 'datacontext', dashboard]);

    function dashboard(common, datacontext) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.bookCount = 0;
        vm.featuredBooks = [];
        vm.newBooks = [];
        vm.title = 'Dashboard';

        activate();

        function activate() {
            var promises = [getMessageCount(), getFeaturedBooks(), getAllBooks()];
            common.activateController(promises, controllerId)
                .then(function () { log('Activated Dashboard View'); });
        }

        function getMessageCount() {
            return datacontext.getMessageCount().then(function (data) {
                return vm.messageCount = data;
            });
        }

        function getFeaturedBooks() {
            return datacontext.getFeaturedBooks().then(function (data) {
                return vm.featuredBooks = data;
            });
        }
        
        function getAllBooks() {
            return datacontext.getAllBooks()
                .then(function(results) {
                    return vm.newBooks = results;
                })
                .then(function() {
                    if (vm.newBooks != null && vm.newBooks.length > 0) {
                        return vm.bookCount = vm.newBooks.length;
                    }
                });
        }
    }
})();