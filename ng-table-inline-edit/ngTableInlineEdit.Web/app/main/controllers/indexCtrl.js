(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('indexCtrl', indexCtrl);

    indexCtrl.$inject = []; 

    function indexCtrl() {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'indexCtrl';

    }
})();
