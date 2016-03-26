(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('aboutCtrl', aboutCtrl);

    aboutCtrl.$inject = []; 

    function aboutCtrl() {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'aboutCtrl';

    }
})();
