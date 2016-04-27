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
$scope.inputData.propertyTaxPercentage=1.65;  //max min default
$scope.inputData.assocDues=0;  //max min default
$scope.inputData.management=0; //max min default
$scope.inputData.misc=1000;  //max min default
$scope.inputData.insuranceRate=1;  //max min default
$scope.inputData.utilsRate=.9;  //max min default
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
      $scope.montlyBuyTotal=($scope.owedAfterDown*($scope.mortgageRateDecimal/12)*Math.pow((1-$scope.mortgageRateDecimal/12),newVal.years))/((Math.pow((1+$scope.mortgageRateDecimal/12),(newVal.mortgageYears*12)))-1);
      $scope.annualBuyTotal=($scope.monthlyBuyTotal)*12+(newVal.targetPrice*newVal.propertyTaxPercentage/100)+(newVal.targetPrice*newVal.utilsRate/100)
      $scope.buy[1].v = $scope.annualBuyTotal*newVal.years;
    //Renting related
      $scope.rent[1].v = newVal.monthlyRentPersonal;


    //duplex related
      $scope.b

      $scope.buyAndRent[1].v = ;
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
