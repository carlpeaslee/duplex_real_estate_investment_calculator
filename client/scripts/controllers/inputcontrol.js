chickApp.controller('InputController',  ['$scope', '$log', '$http', '$window', 'ClientService',function($scope, $log, $http, $window, ClientService) {
//Independent Variables
$scope.inputData = {};
$scope.inputData.monthlyRentPersonal=1500; //max min default
$scope.inputData.monthlyRentTenant=1600; //max min default
$scope.inputData.targetPrice=300000;  //max min default
$scope.inputData.downPaymentPercentage=.5;  //max min default
$scope.inputData.mortgageRate=1000;  //max min default
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

var service = ClientService;

// $scope.inputData = 10;
// $scope.outputData = $scope.inputData * 5;

$scope.rentBar = 500;
$scope.buyBar = 500;
$scope.buyAndRentBar = 500;

$scope.$watchCollection('inputData', function(newVal, oldVal){
    console.log('Changed', newVal, oldVal);








    $scope.buy[1].v = $scope.buyBar;
    $scope.rent[1].v = $scope.rentBar;
    $scope.buyAndRent[1].v = $scope.buyAndRentBar;
})


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


    //this is stuff for submiting the email
    $scope.submit = {};
    $scope.submit.followup = true;

    $scope.submitEmail = function() {
        console.log("submit was clicked", $scope.submit.email, $scope.submit.followup);
        //POST to the server
        $scope.submit.email = "";
        $scope.fade = "";
    }


    //this is the hidden chart stuff


    var buyValues = [10000,20000,30000,40000,50000];
    var rentValues = [20000,40000,60000,40000,60000];
    var buyAndRentValues = [60000,40000,50000,30000,20000];
    var timeframe = 5;

    var dynamicRows = [];
    var populateDynamicRows = function(){
        for (var i = 0; i < timeframe; i++) {
            var newRow = {
                            "c":
                                [
                                    {
                                        "v": i+1
                                    },
                                    {
                                        "v": buyValues[i]
                                    },
                                    {
                                        "v": rentValues[i]
                                    },
                                    {
                                        "v": buyAndRentValues[i]
                                    }
                                ]
            }
            dynamicRows.push(newRow);
        }
    }
    populateDynamicRows();

    $scope.hiddenChartObject = {
        "type": "LineChart",
        "data": {
            "cols": [
                {
                    "id": "year",
                    "label": "Years",
                    "type": "string"
                },
                {
                    "id": "buy-line",
                    "label": "Buy",
                    "type": "number"
                },
                {
                    "id": "rent-line",
                    "label": "Rent",
                    "type": "number"
                },
                {
                    "id": "buyAndRent-line",
                    "label": "Buy & Rent-out",
                    "type": "number"
                }
            ],
            "rows": dynamicRows
        },
        "options": {
            "title": "Long term Return on Investment",
            "isStacked": "true",
            "fill": 20,
            "displayExactValues": true,
            "vAxis": {
                "title": "Return"
            },
            "hAxis": {
                "title": "Years"
            },
            "animation":{
                duration: 3000,
                easing: 'out',
            }
        },
        "formatters": {}
    }


    $scope.fade = "fade";

}]);
