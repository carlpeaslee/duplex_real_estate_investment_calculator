chickApp.factory("AdminService", ["$http", function($http){


    var getDefaults = function(){
        $http.get("/admin/defaults").then(function(response){
            admin.defaults = response.data;
        });
    };

    var getContacts = function(){
        $http.get("/admin/contacts").then(function(response){
            admin.contacts = response.data;
        });
    };

    var admin = {};
    return {
        admin: admin,
        getDefaults: getDefaults,
        getContacts: getContacts
    };
}]);
