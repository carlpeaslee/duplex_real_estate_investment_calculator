chickAppAdmin.controller('AdminController',  ['$scope', '$http', '$window','AdminService',function($scope, $http, $window, AdminService) {
  $scope.toEmailList = function(){
    $window.location.href = '#emailList';
  };
  $scope.toDefaultValues = function(){
    $window.location.href = '#setVariables';
  };

}]);


chickAppAdmin.controller('EmailController',  ['$scope', '$http', '$window','AdminService',function($scope, $http, $window, AdminService) {
  'use strict';

  $scope.selected = [];
  $scope.limitOptions = [5, 10, 15];

  $scope.query = {
    order: 'date',
    limit: 5,
    page: 1
  };

//$scope.emailList is test information.  Will be deleted and replaced with info coming from server through factory.
//count will have to come from a function which checks array length.
  $scope.emailList = {
    "count": 10,
    "data": [
      {
        "date": "05/01/2001",
        "maritalStatus": "Single",
        "email": "tommy@chesterton.com",
        "zipCode": 42342,
        "income": 12311,
        "targetPropertyPrice": 1231231
      }, {
        "date": "05/02/2001",
        "maritalStatus": "Married",
        "email": "tommy2@chesterton.com",
        "zipCode": 42442,
        "income": 12322,
        "targetPropertyPrice": 12312
      }, {
        "date": "05/03/2001",
        "maritalStatus": "Single",
        "email": "tommy3@chesterton.com",
        "zipCode": 11142,
        "income": 11,
        "targetPropertyPrice": 1231
      }, {
        "date": "05/04/2001",
        "maritalStatus": "Single",
        "email": "tommy4@chesterton.com",
        "zipCode": 41111,
        "income": 311,
        "targetPropertyPrice": 31231
      }, {
        "date": "05/05/2001",
        "maritalStatus": "Married",
        "email": "tommy5@chesterton.com",
        "zipCode": 42765,
        "income": 123,
        "targetPropertyPrice": 98234
      }, {
        "date": "05/06/2001",
        "maritalStatus": "Single",
        "email": "tommy6@chesterton.com",
        "zipCode": 98765,
        "income": 12323,
        "targetPropertyPrice": 12313
      }, {
        "date": "05/07/2001",
        "maritalStatus": "Single",
        "email": "tommy7@chesterton.com",
        "zipCode": 42555,
        "income": 1,
        "targetPropertyPrice": 12
      }, {
        "date": "05/08/2001",
        "maritalStatus": "Single",
        "email": "tommy8@chesterton.com",
        "zipCode": 98765,
        "income": 999876554,
        "targetPropertyPrice": 99999999989
      }, {
        "date": "05/09/2001",
        "maritalStatus": "Married",
        "email": "tommy9@chesterton.com",
        "zipCode": 44232,
        "income": 12323213,
        "targetPropertyPrice": 77656789
      }
    ]
  };


  $scope.toggleLimitOptions = function () {
    $scope.limitOptions = $scope.limitOptions ? undefined : [5, 10, 15];
  };

  $scope.loadStuff = function () {
    $scope.promise = $timeout(function () {
      // loading
    }, 2000);
  };

  $scope.logItem = function (item) {
    console.log(item.name, 'was selected');
  };

  $scope.logOrder = function (order) {
    console.log('order: ', order);
  };

  $scope.logPagination = function (page, limit) {
    console.log('page: ', page);
    console.log('limit: ', limit);
  };

}]);


chickAppAdmin.controller('SetVariablesController',  ['$scope', '$http', '$window','AdminService',function($scope, $http, $window, AdminService) {
  AdminService.getDefaults();
  $scope.defaultVariables = {};
  $scope.defaultVariables = AdminService.admin.defaults;

  $scope.setDefaultValues = function(defaultVariables){
    // console.log("Submitting default values: ", defaultVariables);
    AdminService.postDefaults(defaultVariables);
  };


}]);
