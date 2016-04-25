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
  $scope.setDefaultValues = function(){
    console.log("Submitting default values");
  };


}]);
