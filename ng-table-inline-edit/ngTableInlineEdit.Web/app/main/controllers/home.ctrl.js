(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = []; 

    function homeCtrl() {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'homeCtrl';

    }
})();
