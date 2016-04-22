chickApp.controller('AdminController',  ['$scope', '$http', '$window', 'ClientService','AdminService',function($scope, $http, $window, ClientService, AdminService) {
  $scope.toEmailList = function(){
    $window.location.href = '#emailList';
  };
  $scope.toDefaultValues = function(){
    $window.location.href = '#setVariables';
  };

}]);
