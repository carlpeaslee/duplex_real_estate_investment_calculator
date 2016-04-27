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

  AdminService.getContacts();

  $scope.selected = [];

  $scope.query = {
    order: 'date',
    limit: 5,
    page: 1
  };

  function success(emailList) {
    // $scope.emailList = admin.contacts;
  }

  $scope.getEmailList = function () {
    // $scope.promise = $nutrition.desserts.get($scope.query, success).$promise;
    console.log("Geting Email List!");
  };
  //
  $scope.emailList = [
            {
                date: "05/01/2001",
                email: "tommy@chesterton.com",
                zipCode: 42342,
                income: 12311,
                targetPropertyPrice: 1231231
            },
            {
              date: "05/09/2001",
              email: "tommy9@chesterton.com",
              zipCode: 42342,
              income: 1231231,
              targetPropertyPrice: 1231234231
            },
            {
              date: "05/07/2001",
              email: "tommy8@chesterton.com",
              zipCode: 42342,
              income: 1231,
              targetPropertyPrice: 123123545721
            },
            {
              date: "05/06/2001",
              email: "tommy7@chesterton.com",
              zipCode: 42342,
              income: 123122452331,
              targetPropertyPrice: 1231231
            },
            {
              date: "05/07/2001",
              email: "tommy6@chesterton.com",
              zipCode: 42342,
              income: 122634231,
              targetPropertyPrice: 1231231
            },
            {
              date: "05/15/2001",
              email: "tommy5@chesterton.com",
              zipCode: 42342,
              income: 1,
              targetPropertyPrice: 1231231
            },
            {
              date: "05/13/2001",
              email: "tommy4@chesterton.com",
              zipCode: 42342,
              income: 125431,
              targetPropertyPrice: 1231231
            },
            {
              date: "05/12/2001",
              email: "tommy3@chesterton.com",
              zipCode: 42342,
              income: 1231,
              targetPropertyPrice: 1231231
            },
            {
              date: "05/30/2001",
              email: "tommy2@chesterton.com",
              zipCode: 42342,
              income: 1241,
              targetPropertyPrice: 1231231
            },
            {
              date: "05/12/2001",
              email: "tommy1@chesterton.com",
              zipCode: 42342,
              income: 21,
              targetPropertyPrice: 1231231
            }
        ];

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
