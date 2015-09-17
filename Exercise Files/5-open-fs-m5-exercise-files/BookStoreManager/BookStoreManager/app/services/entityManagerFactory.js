(function() {
    'use strict';
    
    var serviceId = 'entityManagerFactory';
    angular.module('app').factory(serviceId, ['config', 'model', '$q', '$rootScope', emFactory]);

    function emFactory(config, model, $q, $rootScope) {
        breeze.config.initializeAdapterInstance('modelLibrary', 'backingStore', true);  // default
        breeze.core.extendQ($rootScope, $q);
        
        var serviceName =  "http://localhost:64265/";
        var metadataStore = model.createMetadataStore(serviceName);
        var provider = {
            metadataStore: metadataStore,
            newManager: newManager
        };
        
        return provider;
       
        function newManager() {
            var mgr = new breeze.EntityManager({
                serviceName: serviceName,
                metadataStore: metadataStore
            });
            return mgr;
        }
        

    }
})();