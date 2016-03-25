(function () {
    'use strict';

    angular
        .module('dataApp')
        .factory('userDataSvc', userDataSvc);

    userDataSvc.$inject = ['$resource', '$q'];

    function userDataSvc($resource, $q) {
        var service = {
            getUsers: _getUsers,
            getUser: _getUser
        };

        var resourceAll = $resource('/api/user/all', { });
        var resourceSingle = $resource('/api/user/byid/:userId', { userId: '@userId' });

        return service;

        function _getUsers() {
            var deferred = $q.defer();
            resourceAll.query({},
				function (data) {
				    deferred.resolve(data);
				},
				function (error) {
				    deferred.reject(error);
				});
            return deferred.promise;
        }

        function _getUser(userId) {
            var deferred = $q.defer();
            resourceSingle.get({ userId: userId },
				function (data) {
				    deferred.resolve(data);
				},
				function (error) {
				    deferred.reject(error);
				});
            return deferred.promise;
        }
    }
})();