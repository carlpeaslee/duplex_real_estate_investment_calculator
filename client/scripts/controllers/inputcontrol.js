chickApp.controller('InputController',  ['$scope', '$log', '$http', '$window', 'ClientService',function($scope, $log, $http, $window, ClientService) {
//Independent Variables
$scope.inputData = {};
$scope.inputData.monthlyRentPersonal=1500; //max min default
$scope.inputData.monthlyRentTenant=1600; //max min default
$scope.inputData.targetPrice=300000;  //max min default
$scope.inputData.downPaymentPercentage=5;  //max min default  putting 5% down would be 5 not .05
$scope.inputData.mortgageRate=4.25;  //max min default
$scope.inputData.yearsAmmoritized=500; //max min default
$scope.inputData.income=100;  //max min default
$scope.inputData.mortgageYears=30;  //max min default
$scope.inputData.vacancy=.05;  //max min default
$scope.inputData.propertyTaxPercentage=.0165  //max min default
$scope.inputData.assocDues=0;  //max min default
$scope.inputData.management=0; //max min default
$scope.inputData.misc=1000;  //max min default
$scope.inputData.insuranceRate=.01;  //max min default
$scope.inputData.utilsRate=.009;  //max min default
$scope.inputData.legalAccounting=100;  //max min default
$scope.inputData.taxBracket=.28;
$scope.inputData.years=5;

var service = ClientService;

// $scope.inputData = 10;
// $scope.outputData = $scope.inputData * 5;
$scope.buyBar = 500;
$scope.buyAndRentBar = 500;

$scope.$watchCollection('inputData', function(newVal, oldVal){
    console.log('Changed', newVal, oldVal);
    //effects all options


    //Buying not duplex
      //after down value
      $scope.owedAfterDown=newVal.targetPrice*(1-newVal.downPaymentPercentage/100)
      //mortgageRate
      $scope.mortgageRateDecimal=newVal.mortgageRate/100
      //monthlyCost
      $scope.montlyBuyTotal=$scope.owedAfterDown*($scope.mortgageRateDecimal/12)*Math.pow((1-$scope.mortgageRateDecimal/12),newVal.years)

      $scope.buy[1].v = s;
    //Renting related
    $scope.rent[1].v = newVal.monthlyRentPersonal;


    //duplex related
    $scope.buyAndRent[1].v = $scope.buyAndRentBar;
})






    ///chart stuffff

    $scope.myChartObject = {};

    $scope.myChartObject.type = "ColumnChart";

    $scope.buy = [
        {v: "Buy"},
        {v: $scope.outputData},
        {v: 'red'}
    ];

    // $scope.$watch('monthlyRentPersonal', function(newVal, oldVal) {
    //     $log.info newVal
    // });

    $scope.rent = [
        {v: "Rent"},
        {v: 200},
        {v: 'green'}
    ];

    $scope.buyAndRent = [
        {v: "Buy & Rent-out"},
        {v: 600},
        {v: 'purple'}
    ];

    $scope.myChartObject.data = {
        "cols": [
            {id: "options", label: "Options", type: "string"},
            {id: "dollars", label: "Dollars", type: "number"},
            {role: "style", type: "string"}
        ],
        "rows": [
            {c: $scope.buy},
            {c: $scope.rent},
            {c: $scope.buyAndRent}
        ]
    };

    $scope.myChartObject.options = {
        'title': 'Buy vs Rent vs Buy & Rent-out',
        animation:{
            duration: 3000,
            easing: 'out',
        }
    };
}]);
