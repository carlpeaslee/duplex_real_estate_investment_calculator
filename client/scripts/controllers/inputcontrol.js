chickApp.controller('InputController',  ['$scope', '$http', '$window', 'ClientService',function($scope, $http, $window, ClientService) {
  //Independent Variables
  $scope.monthlyRentPersonal=1500; //max min default
  $scope.monthlyRentTenant=1600; //max min default
  $scope.targetPrice=300000;  //max min default
  $scope.downPaymentPercentage=.5;  //max min default
  $scope.mortgageRate=1000;  //max min default
  $scope.yearsAmmoritized=500; //max min default
  $scope.income=100;  //max min default
  $scope.mortgageYears=30;  //max min default
  $scope.vacancy=.05;  //max min default
  $scope.propertyTaxPercentage=.0165  //max min default
  $scope.assocDues=0;  //max min default
  $scope.management=0; //max min default
  $scope.misc=1000;  //max min default
  $scope.insuranceRate=.01;  //max min default
  $scope.utilsRate=.009;  //max min default
  $scope.legalAccounting=100;  //max min default
  $scope.taxBracket=.28;

  // $scope.maritalStatusBool = false;
  $scope.maritalStatus = "Single";


  // Sets the bool value for marital status to be sent to the DB
  $scope.setStatus = function(){
    console.log("I are tommy");
    console.log($scope.maritalStatus);

    // if ($scope.maritalStatus == 'Single'){
    //   $scope.maritalStatusBool = false;
    //   console.log("we are false");
    //   console.log($scope.maritalStatus);
    // } else {
    //   $scope.maritalStatusBool = true;
    //   console.log("we are true");
    //   console.log($scope.maritalStatus);
    // }
  };


//Dependent variables
  //basics
  $scope.downPaymentValue=$scope.targetPrice*($scope.downPaymentPercentage/100);
  $scope.monthlyCost=($scope.targetPrice-$scope.downPaymentValue)*($scope.mortgageRate/12)*Math.pow((1+$scope.mortgageRate/12),($scope.mortgageYears*12))/(Math.pow((1+$scope.mortgageRate/12),($scope.mortgageYears*12))-1);
  $scope.annualCost=$scope.monthlyCost*12;
  //predepreciation
  $scope.landValue=$scope.targetPrice*0.25;
  $scope.personalPropertyValue=$scope.targetPrice*0.05;
  $scope.buildingValue=$scope.targetPrice*0.5;
  $scope.landImprovementValue=$scope.targetPrice*0.2;

  //decpreciation
  $scope.personalPropertyDepreciation=$scope.personalPropertyValue*0.2;
  $scope.buildingDepreciation=$scope.buildingValue*0.0348;
  $scope.landImprovementDeprecation=$scope.landImprovementValue*0.05;
  $scope.totalDepreciation=$scope.personalPropertyDepreciation+$scope.buildingDepreciation+$scope.landImprovementDeprecation;

  //rent stuff
  $scope.annualRent=$scope.monthlyRentTenant*12;
  $scope.propertyTaxesActual=$scope.targetPrice*$scope.propertyTaxPercentage;

  //annual operation expenses
  $scope.realEstateTax=$scope.targetPrice*$scope.propertyTaxPercentage;
  $scope.repairs=$scope.targetPrice*.0165;
  $scope.insurance=$scope.targetPrice*$scope.insuranceRate;
  $scope.utils=$scope.targetPrice*$scope.utilsRate;
  $scope.totalOperatingExpenses=$scope.utils+$scope.insurance+$scope.repairs+$scope.realEstateTax+$scope.misc+$scope.management+$scope.assocDues;

  //Operating income
  $scope.grossOperatingIncome=$scope.annualRent*(1-$scope.vacancy);
  $scope.afterExpenseOperatinIncome=$scope.grossOperatingIncome-$scope.totalOperatingExpenses;


  //debt Service
  $scope.principalReduction=$scope.annualCost-(($scope.targetPrice-$scope.downPaymentValue)*$scope.mortgageRate);


  //
  $scope.taxPaidOrSaved=(-1)*$scope.taxBracket*(($scope.targetPrice-$scope.downPaymentValue)+($scope.totalOperatingExpenses+$scope.grossOperatingIncome)+$scope.totalDepreciation);


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
