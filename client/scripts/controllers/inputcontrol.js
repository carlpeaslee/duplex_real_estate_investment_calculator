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

    $scope.onions = [
        {v: "Onions"},
        {v: 3},
    ];

    $scope.myChartObject.data = {"cols": [
        {id: "t", label: "Topping", type: "string"},
        {id: "s", label: "Slices", type: "number"}
    ], "rows": [
        {c: [
            {v: "Mushrooms"},
            {v: 3},
        ]},
        {c: $scope.onions},
        {c: [
            {v: "Olives"},
            {v: 31}
        ]},
        {c: [
            {v: "Zucchini"},
            {v: 1},
        ]},
        {c: [
            {v: "Pepperoni"},
            {v: 2},
        ]}
    ]};

    $scope.myChartObject.options = {
        'title': 'How Much Pizza I Ate Last Night'
    };

}]);
