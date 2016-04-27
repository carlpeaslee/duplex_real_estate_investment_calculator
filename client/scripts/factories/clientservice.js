chickApp.factory("ClientService", ["$http", function($http){

    var client = {};

    var getDefaults = function(){
        $http.get("/defaults").then(function(response){
            client.defaults = response.data;
        });
    };

    var submitEmail = function(){
        $http.post("/submit", data).then(function(response){
            //what should happen next?
        });
    };

    return {
        client: client,
        getDefaults: getDefaults,
        submitEmail: submitEmail
    };
}]);
