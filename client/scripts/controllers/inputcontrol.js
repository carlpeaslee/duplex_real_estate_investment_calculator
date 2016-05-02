chickApp.controller('InputController',  ['$scope', '$log', '$http', '$window', 'ClientService',function($scope, $log, $http, $window, ClientService) {
//Independent Variables
var clientService = ClientService;

$scope.submitEmail = function(){
    console.log("submit was clicked", $scope.submit.email, $scope.submit.followup);
    var contactPackage = {
        email: $scope.submit.email,
        maritalStatus: $scope.inputData.maritalStatus,
        zipCode: $scope.inputData.zipCode,
        income: $scope.inputData.income,
        targetPropertyPrice: $scope.inputData.targetPrice,
        followup: $scope.submit.followup
    };
    clientService.submitEmail(contactPackage);
    $scope.submit.email = "";
    $scope.fade = "";
};

$scope.inputData = {};
$scope.minMax = {};

$scope.getDefaults = function() {
  $http.get("/defaults").then(function(response){
      defaultVariables = response.data[0];
      console.log("defaultVariables: ", defaultVariables);
      $scope.minMax = defaultVariables;

      $scope.inputData.monthlyRentPersonal= defaultVariables.monthlyRentPersonalDef;
      $scope.inputData.monthlyRentTenant= defaultVariables.monthlyRentTenantDef;
      $scope.inputData.targetPrice= defaultVariables.targetPriceDef;
      $scope.inputData.downPaymentPercentage= defaultVariables.downPaymentPercentageDef;
      $scope.inputData.mortgageRate= defaultVariables.mortgageRateDef;
      $scope.inputData.yearsAmmoritized= defaultVariables.yearsAmmoritizedDef;
      $scope.inputData.income= defaultVariables.incomeDef;
      $scope.inputData.mortgageYears= defaultVariables.mortgageYearsDef;
      $scope.inputData.vacancy= defaultVariables.vacancyDef;
      $scope.inputData.propertyTaxPercentage= defaultVariables.propertyTaxPercentageDef;
      $scope.inputData.assocDues= defaultVariables.assocDuesDef;
      $scope.inputData.management= defaultVariables.managementDef;
      $scope.inputData.misc= defaultVariables.miscDef;
      $scope.inputData.insuranceRate= defaultVariables.insuranceRateDef;
      $scope.inputData.utils= defaultVariables.utilsDef;
      $scope.inputData.legalAccounting= defaultVariables.legalAccountingDef;
      $scope.inputData.taxBracket= defaultVariables.taxBracketDef;
      $scope.inputData.repairValue= defaultVariables.repairValueDef;
      $scope.inputData.years= defaultVariables.yearsDef;
      $scope.inputData.maritalStatus = false;
      $scope.inputData.zipCode = defaultVariables.zipCode;

  });
};
$scope.getDefaults();

var service = ClientService;

$scope.$watchCollection('inputData', function(newVal, oldVal){
    console.log('Changed', newVal, oldVal);
    //effects all options

    //Buying not duplex
      //after down value
      $scope.owedAfterDown=newVal.targetPrice*(1-newVal.downPaymentPercentage/100);
      //mortgageRate
      $scope.mortgageRateDecimal=newVal.mortgageRate/100;
      //mortgage rate year
      $scope.mortgageRateDecimalMonthly=$scope.mortgageRateDecimal/12;
      //monthly spending before normal expenses
      $scope.monthlyBuyPre=$scope.owedAfterDown*($scope.mortgageRateDecimalMonthly)*Math.pow((1+$scope.mortgageRateDecimalMonthly),(newVal.mortgageYears*12))/(Math.pow((1+$scope.mortgageRateDecimalMonthly),(newVal.mortgageYears*12))-1);
      //annual spending before expense
      $scope.annualBuyPre=$scope.monthlyBuyPre*12;
      //property tax
      $scope.propTax = newVal.targetPrice*newVal.propertyTaxPercentage/100;
      //Property insuranceRate
      $scope.propInsurance = newVal.targetPrice*newVal.insuranceRate/100;
      //adding up the costs
        //first year:
        $scope.firstYear=$scope.annualBuyPre+$scope.propTax+newVal.repairValue+newVal.assocDues+newVal.management+newVal.misc+$scope.propInsurance+newVal.utils+newVal.legalAccounting+(newVal.targetPrice*newVal.downPaymentPercentage/100);
        //years after that:
        $scope.otherYears=$scope.annualBuyPre+$scope.propTax+newVal.repairValue+newVal.assocDues+newVal.management+newVal.misc+$scope.propInsurance+newVal.utils+newVal.legalAccounting;
        //actual yearwise
        $scope.buy[1].v = $scope.firstYear+($scope.otherYears*(newVal.years-1));

    //Renting related
      $scope.rent[1].v = newVal.monthlyRentPersonal*12*newVal.years+newVal.utils;


    //duplex related
      //initially the same as buying a house
      $scope.initialDuplex=$scope.buy[1].v;
      //rent tenenate
      $scope.rentTenantAnnual=newVal.monthlyRentTenant*12*(1-newVal.vacancy/100);
      //decpreciation values
      $scope.depPersProp=newVal.targetPrice*0.05*0.2;
      $scope.depBuildingValue=newVal.targetPrice*0.5*0.0348;
      $scope.depLandImprovVal=newVal.targetPrice*0.05*0.2;
      $scope.annualDebtService=$scope.annualBuyPre-($scope.owedAfterDown*$scope.mortgageRateDecimal);
      //net operating income
      $scope.netOperatingIncome = $scope.rentTenantAnnual-$scope.propTax-$scope.propInsurance-newVal.repairValue-newVal.assocDues-newVal.management-newVal.misc-newVal.utils-newVal.legalAccounting;
      $scope.interestNet = $scope.owedAfterDown*$scope.mortgageRateDecimal;
      $scope.depTot=$scope.depPersProp+$scope.depBuildingValue+$scope.depLandImprovVal;
      $scope.taxableIncome=$scope.netOperatingIncome-$scope.interestNet-$scope.depTot;
      $scope.incomeTaxPay=$scope.taxableIncome*newVal.taxBracket/100;


      $scope.buyAndRent[1].v = $scope.initialDuplex-$scope.rentTenantAnnual-$scope.depPersProp-$scope.depBuildingValue-$scope.depLandImprovVal-$scope.incomeTaxPay;





});




    ///chart stuffff
    $scope.$watch.years=3;

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
            };
            dynamicRows.push(newRow);
        }
    };
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
    };


    $scope.fade = "fade";

}]);
