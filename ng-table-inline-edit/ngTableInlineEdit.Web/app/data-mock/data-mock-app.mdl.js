(function () {
    'use strict';

    var app = angular.module('dataMockApp', [
        // Angular modules
        'ngMockE2E'

        // Custom modules

        // 3rd Party Modules
        
    ]);

    app.run(['$httpBackend', function ($httpBackend) {

        var users = [
            {
                userId: 1,
                firstName: 'Manuel',
                lastName: 'French',
                dob: new Date('8/24/1980')
            },
            {
                userId: 2,
                firstName: 'Patty',
                lastName: 'Palmer',
                dob: new Date('2/24/1990')
            },
            {
                userId: 3,
                firstName: 'Sheldon',
                lastName: 'Holmes',
                dob: new Date('5/24/1987')
            },
            {
                userId: 4,
                firstName: 'Chester',
                lastName: 'May',
                dob: new Date('3/24/1992')
            },
            {
                userId: 5,
                firstName: 'Lorena',
                lastName: 'Ray',
                dob: new Date('9/24/1981')
            },
            {
                userId: 6,
                firstName: 'Ted',
                lastName: 'Boyd',
                dob: new Date('2/24/1978')
            },
            {
                userId: 7,
                firstName: 'Maurice',
                lastName: 'Morales',
                dob: new Date('5/24/1996')
            },
            {
                userId: 8,
                firstName: 'Jason',
                lastName: 'Moreno',
                dob: new Date('8/24/1965')
            },
            {
                userId: 9,
                firstName: 'Samantha',
                lastName: 'Houston',
                dob: new Date('9/24/1984')
            },
            {
                userId: 10,
                firstName: 'Lucy',
                lastName: 'Hardy',
                dob: new Date('1/24/1977')
            }
        ];
        
        var userUrl = "/api/user/all"
        var editingRegex = new RegExp("api/user/byid/[0-9][0-9]*", ''); // regex to define the url when getting 1 item

        $httpBackend.whenGET(userUrl).respond(users);

        //when getting 1 item
        $httpBackend.whenGET(editingRegex).respond(function (method, url, data) {
            var user = { userId: 0 };
            var parameters = url.split('/');
            var length = parameters.length;
            var id = parameters[length - 1];

            if (id > 0) {
                for (var i = 0; i < users.length; i++) {
                    if (users[i].userId == id) {
                        user = users[i];
                        break;
                    }
                };
            }
            return [200, user, {}];
        });

        $httpBackend.whenPOST(userUrl).respond(function (method, url, data) {
            var user = angular.fromJson(data);

            if (!user.userId) {
                // new user Id
                user.userId = users[users.length - 1].userId + 1;
                users.push(user);
            }
            else {
                // Updated user
                for (var i = 0; i < users.length; i++) {
                    if (users[i].userId == user.userId) {
                        users[i] = user;
                        break;
                    }
                };
            }
            return [200, users, {}];
        });

        // Pass through any requests for views in app folder
        $httpBackend.whenGET(/app/).passThrough();
    }]);
})();
