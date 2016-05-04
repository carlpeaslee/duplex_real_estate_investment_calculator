var chickApp = angular.module("chickApp", ['ngMaterial', 'ngMessages', 'ngRoute', 'googlechart']);

chickApp.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider){

}]);

var chickAppAdmin = angular.module("chickAppAdmin", ['ngMaterial', 'ngMessages', 'ngRoute', 'md.data.table']);

chickAppAdmin.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider){
    $routeProvider.
        when("/admin", {
            templateUrl: "/views/admin.html",
            controller: "AdminController"
        }).
        when("/emailList", {
            templateUrl: "/views/partials/emailList.html",
            controller: "EmailController"
        }).
        when("/setVariables", {
            templateUrl: "/views/partials/setVariables.html",
            controller: "SetVariablesController"
        }).
        otherwise({
            redirectTo: '/emailList'
        });
}]);

var chickAppRegistration = angular.module("chickAppRegistration", ['ngMaterial', 'ngRoute']);

chickAppRegistration.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider){

}]);

var chickAppLogin = angular.module("chickAppLogin", ['ngMaterial', 'ngRoute']);

chickAppLogin.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider){

}]);
