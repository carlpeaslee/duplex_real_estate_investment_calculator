chickAppAdmin.factory("AdminService", ["$http", function($http){


    var getDefaults = function(){
        admin.defaults = {};
        $http.get("/defaults").then(function(response){
            admin.defaults = response.data;
        });
    };

    //Going to need this post in order to send variables to database.
    var postDefaults = function(defaultVariables){
      // $http.post("/admin/defaults", defaultVariables).then(function(request){
        console.log(defaultVariables);
      // });
    };

    var getContacts = function(){
      admin.contacts = {};
      console.log("Running getContacts!");
      // $http.get("/admin/contacts").then(function(response){
      //     admin.contacts = response.data;
      // });
    };

    var admin = {};
    return {
        admin: admin,
        getDefaults: getDefaults,
        postDefaults : postDefaults,
        getContacts: getContacts
    };
}]);
