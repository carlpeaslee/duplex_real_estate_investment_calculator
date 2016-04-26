chickApp.controller('AdminController',  ['$scope', '$http', '$window', 'ClientService','AdminService',function($scope, $http, $window, ClientService, AdminService) {
  $scope.toEmailList = function(){
    $window.location.href = '#emailList';
  };
  $scope.toDefaultValues = function(){
    $window.location.href = '#setVariables';
  };

}]);


chickApp.controller('EmailController',  ['$scope', '$http', '$window', 'ClientService','AdminService',function($scope, $http, $window, ClientService, AdminService) {
  'use strict';

  AdminService.getContacts();
  // $scope.selected = [];

  $scope.query = {
    order: 'date',
    limit: 5,
    page: 1
  };

  function success(emailList) {
    $scope.emailList = admin.contacts;
  }

  $scope.getEmailList = function () {
    // $scope.promise = $nutrition.desserts.get($scope.query, success).$promise;
    console.log("Geting Email List!");
  };


}]);


chickApp.controller('SetVariablesController',  ['$scope', '$http', '$window', 'ClientService','AdminService',function($scope, $http, $window, ClientService, AdminService) {
  AdminService.getDefaults();
  $scope.defaultVariables = {};
  $scope.defaultVariables = AdminService.admin.defaults;

  $scope.setDefaultValues = function(defaultVariables){
    // console.log("Submitting default values: ", defaultVariables);
    AdminService.postDefaults(defaultVariables);
  };


}]);
