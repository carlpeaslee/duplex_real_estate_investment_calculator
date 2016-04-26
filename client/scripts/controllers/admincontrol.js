chickApp.controller('AdminController',  ['$scope', '$http', '$window', 'ClientService','AdminService',function($scope, $http, $window, ClientService, AdminService) {
  $scope.toEmailList = function(){
    $window.location.href = '#emailList';
  };
  $scope.toDefaultValues = function(){
    $window.location.href = '#setVariables';
  };

}]);


chickApp.controller('EmailController',  ['$scope', '$http', '$window', 'ClientService','AdminService',function($scope, $http, $window, ClientService, AdminService) {



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
