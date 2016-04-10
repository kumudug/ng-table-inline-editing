(function () {
    'use strict';

    angular
        .module('mainApp')
        .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['userDataSvc', '$log', 'NgTableParams'];

    function homeCtrl(userDataSvc, $log, NgTableParams) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'homeCtrl';
        vm.data = [];
        vm.tableParams = null;
        vm.tableSettings = null;
        
        vm.tableParams = new NgTableParams(
            { page: 1, count: 8 },
            {
                total: 100,
                counts: [],
                getData: function ($defer, params) {
                    var count = params.count();
                    var page = params.page() - 1;
                    var currentPageData = [];

                    if (vm.data && vm.data.length > 0) {
                        vm.tableParams.total(vm.data.length);

                        if (vm.data.length > count) {
                            var startIndex = page * count;
                            var endIndex = startIndex + count;
                            currentPageData = vm.data.slice(startIndex, endIndex);
                        } else {
                            currentPageData = vm.data;
                        }
                    } else {
                        vm.tableParams.total(0);
                    }

                    $defer.resolve(currentPageData);
                }
            }
        );

        (function () {
            userDataSvc.getUsers().then(
                function (data) {
                    vm.data = data;
                    vm.tableParams.reload();
                }, function rejected(reason) {
                    $log.error(reason);
                }, function notify(update) {
                    $log.info(update);
                });
        })();
    }
})();
