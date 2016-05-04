chickAppAdmin.controller('AdminController',  ['$scope', '$http', '$window','AdminService',function($scope, $http, $window, AdminService) {
  $scope.toEmailList = function(){
    $window.location.href = '#emailList';
  };
  $scope.toDefaultValues = function(){
    $window.location.href = '#setVariables';
  };

}]);


chickAppAdmin.controller('EmailController',  ['$scope', '$http', '$window','AdminService', '$mdDialog',function($scope, $http, $window, AdminService, $mdDialog) {
  'use strict';

  $scope.removed = false;
  $scope.selected = [];
  $scope.limitOptions = [5, 10, 15];

  $scope.query = {
    order: 'date',
    limit: 5,
    page: 1
  };

AdminService.getContacts();
$scope.getContacts = function(){
  $http.get("/submit").then(function(response){
      $scope.emailList = response.data;
      console.log($scope.emailList);
      $scope.count = $scope.emailList.length;
  });
};
$scope.getContacts();


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

$scope.changeStatus = function(id){
  console.log("Changing status of contact with id: ", id);
};

// $scope.deleteContact = function(id){
//   console.log("Deleting contact with id: ", id);
//   AdminService.deleteTheContact(id);
// };

$scope.deleteContact = function(id) {
    var confirm = $mdDialog.confirm()
          .title('Are you sure you want to elete this contact?')
          .ok('Yes')
          .cancel('No');
    $mdDialog.show(confirm).then(function() {
      console.log("Yes");
      AdminService.deleteTheContact(id);
      $scope.getContacts();
    }, function() {
      console.log("No");
    });
  };

// $scope.changeStatus = function(id){
//   console.log("Changing status on contact with ID: ", id);
//   AdminService.updateTheContact(id);
//   $scope.getContacts();
// };

$scope.changeStatus = function(id) {
    var confirm = $mdDialog.confirm()
          .title('Are you sure you want to mark contact as "Contacted"?')
          .ok('Yes')
          .cancel('No');
    $mdDialog.show(confirm).then(function() {
      console.log("Yes");
      AdminService.updateTheContact(id);
      $scope.getContacts();
    }, function() {
      console.log("No");
    });
  };

}]);


chickAppAdmin.controller('SetVariablesController',  ['$scope', '$http', '$window','AdminService',function($scope, $http, $window, AdminService) {
  var adminService = AdminService;

$scope.getDefaults = function() {
  $http.get("/defaults").then(function(response){
      console.log(response.data);
      $scope.defaultVariables = response.data[0];
      console.log("Inside get call: ", $scope.defaultVariables);
      AdminService.admin.defaults = $scope.defaultVariables;
  });
};

$scope.getDefaults();

  // //These did not work because even though factory was making get call it was not updating.
  // AdminService.getDefaults();
  // $scope.defaultVariables = {};
  // $scope.defaultVariables = AdminService.admin.defaults;
  // $scope.$watchCollection('inputData', function(newVal, oldVal){
  //     console.log('Changed', newVal, oldVal);
  //     $scope.defaultVariables = AdminService.admin.defaults;
  // });

  $scope.setDefaultValues = function(defaultVariables){
    // console.log("Submitting default values: ", defaultVariables);
    AdminService.alterDefaults(defaultVariables);
  };


}]);
