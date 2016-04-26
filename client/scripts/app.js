var chickApp = angular.module("chickApp", ['ngMaterial', 'ngMessages', 'ngRoute', 'googlechart', 'md.data.table']);

chickApp.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider){
    $routeProvider.
    //     when("/", {
    //         templateUrl: "/views/index.html",
    //         controller: "InputController"
        // }).
        when("/admin", {
            templateUrl: "/views/index.html",
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
