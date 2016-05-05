chickAppRegistration.controller('RegistrationController',  ['$scope', '$log', '$http', '$window', function($scope, $log, $http, $window) {
  //Independent Variables
  $scope.username_register;
  $scope.password_register;

  $scope.submit = function(){
    console.log("Register Button Works");
    console.log($watch.$scope.username_register);
    console.log($watch.$scope.password_register);
  }
}]);
