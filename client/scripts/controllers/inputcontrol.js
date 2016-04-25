chickApp.controller('InputController',  ['$scope', '$http', '$window', 'ClientService', function($scope, $http, $window, ClientService) {
    $scope.monthlyRent=1500;
    $scope.targetPrice=7000000;
    $scope.downPayment=.5;
    $scope.mortgagePrice=1000;
    $scope.yearsAmmoritized=500;
    $scope.income=100;


    ///chart stuffff

    $scope.myChartObject = {};

    $scope.myChartObject.type = "BarChart";

    $scope.buy = [
        {v: "Buy"},
        {v: 600},
    ];

    $scope.rent = [
        {v: "Rent"},
        {v: 600},
    ];

    $scope.buyAndRent = [
        {v: "Buy & Rent-out"},
        {v: 600},
    ];

    $scope.myChartObject.data = {
        "cols": [
            {id: "t", label: "Topping", type: "string"},
            {id: "s", label: "Slices", type: "number"}
        ],
        "rows": [
            {c: $scope.buy},
            {c: $scope.rent},
            {c: $scope.buyAndRent}
        ]
    };

    $scope.myChartObject.options = {
        'title': 'Buy vs Rent vs Buy & Rent-out'
    };

}]);
