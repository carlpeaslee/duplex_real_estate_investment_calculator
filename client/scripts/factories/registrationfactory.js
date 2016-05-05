chickAppRegistration.factory('RegisterFactory', ['$http', function($http){

  var data = {};

  var postData = function(username, password){
    $http.post('/admin/reg', username, password).success(function(response){

    });
  }

  return {

  };
}]);
