chickAppAdmin.factory("AdminService", ["$http", function($http){
    var admin = {};


    // //This is currently //'d out b/c could not get info from Factory to update view.
    // var getDefaults = function(){
    //     admin.defaults = {};
    //     $http.get("/defaults").then(function(response){
    //         // console.log(response.data);
    //         admin.defaults = response.data[0];
    //         console.log("Inside get call: ", admin.defaults);
    //     });
    //     console.log("Outside get call: ", admin.defaults);
    // };


    var alterDefaults = function(object){
        $http.put('/defaults/' + admin.defaults._id, object).then(function(){
            console.log(object);
        });
    };

    // //Going to need this post in order to send variables to database.
    // var postDefaults = function(defaultVariables){
    //   // $http.post("/admin/defaults", defaultVariables).then(function(request){
    //     console.log(defaultVariables);
    //   // });
    // };

    var getContacts = function(){
      admin.contacts = {};
      console.log("Running getContacts!");
      $http.get("/submit").then(function(response){
          admin.contacts = response.data;
          console.log(admin.contacts);
      });
    };

    return {
        admin: admin,
        // getDefaults: getDefaults,
        alterDefaults : alterDefaults,
        getContacts: getContacts
    };
}]);
