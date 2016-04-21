var chickApp = angular.module("chickApp", ['ngMaterial', 'ngMessages', 'ngRoute']);

chickApp.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider){
    $routeProvider.
        when("/", {
            templateUrl: "/views/index.html",
            controller: "InputControl"
        }).
        when("/admin", {
            templateUrl: "/views/admin.html",
            controller: "AdminControl"
        }).
        otherwise({
            redirectTo: '/'
        });
}]);
