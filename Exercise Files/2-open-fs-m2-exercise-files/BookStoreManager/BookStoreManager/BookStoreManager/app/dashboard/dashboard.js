(function () {
    'use strict';
    var controllerId = 'dashboard';
    angular.module('app').controller(controllerId, ['common', 'datacontext', dashboard]);

    function dashboard(common, datacontext) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.news = {
            title: 'Book Store Manager',
            description: 'Book Store Manager is an Angular SPA Application'
        };
        vm.messageCount = 0;
        vm.featuredBooks = [];
        vm.title = 'Dashboard';

        activate();

        function activate() {
            var promises = [getMessageCount(), getFeaturedBooks()];
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
    }
})();