var chickApp = angular.module("chickApp", ['ngMaterial', 'ngMessages', 'ngRoute']);

chickApp.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider){
    // $routeProvider.
    //     when("/", {
    //         templateUrl: "/views/index.html",
    //         controller: "InputController"
    //     }).
    //     when("/admin", {
    //         templateUrl: "/views/admin.html",
    //         controller: "AdminController"
    //     }).
    //     otherwise({
    //         redirectTo: '/'
    //     });
}]);
