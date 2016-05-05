chickAppRegistration.factory('RegisterFactory', ['$http', function($http){

  var data = {};

  var postData = function(username, password){
    var registerObject = {};
    registerObject.username = username;
    registerObject.password = password;
    $http.post('/admin', registerObject).success(function(response){
      console.log("We Dun Did It");
    });
  }

  return {
    postData : postData
  };
}]);
