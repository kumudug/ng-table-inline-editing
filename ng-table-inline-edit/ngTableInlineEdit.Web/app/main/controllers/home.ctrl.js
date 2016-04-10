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
        vm.openDatePopup = openPopup;
        vm.actions = {};
        vm.dateOptions = {};

        var nextNewIndex = 0;

        vm.actions = {
            undo: undoClick,
            save: saveClick,
            delete: deleteClick,
            edit: editClick,
            add: addClick
        };

        vm.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };

        function openPopup(row) {
            row.opened = true;
        }

        var actionStates = {
            edit: 'edit',
            delete: 'delete',
            new: 'new'
        };
        
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
                    nextNewIndex = vm.data.length + 1;
                    vm.tableParams.reload();
                }, function rejected(reason) {
                    $log.error(reason);
                }, function notify(update) {
                    $log.info(update);
                });
        })();

        function undoClick(row, index) {
            if (row.actionState == actionStates.new) {
                vm.data.splice(index, 1);
                vm.tableParams.reload();
            } else {
                userDataSvc.getUser(row.userId).then(
                    function (data) {
                        vm.data[index] = data;
                        vm.tableParams.reload();
                    }, function rejected(reason) {
                        $log.error(reason);
                    }, function notify(update) {
                        $log.info(update);
                    });
            }
        }

        function saveClick(row, index) {
            if (row.actionState == actionStates.delete)
            {
                vm.data.splice(index, 1);
            }
            row.actionState = '';
            vm.tableParams.reload();
        }

        function deleteClick(row) {
            row.actionState = actionStates.delete;
        }

        function editClick(row) {
            row.actionState = actionStates.edit;
        }

        function addClick() {
            var newUser = {
                userId: nextNewIndex,
                firstName: '',
                lastName: '',
                dob: new Date('1/1/1980'),
                actionState: actionStates.new
            };
            vm.data.splice(0, 0, newUser);
            nextNewIndex += 1;
            vm.tableParams.reload();
        }
    }
})();
