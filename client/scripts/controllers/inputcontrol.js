chickApp.controller('InputController',  ['$scope', '$log', '$http', '$window', '$mdSidenav', 'ClientService',function($scope, $log, $http, $window, $mdSidenav, ClientService) {
//Independent Variables
var clientService = ClientService;

$scope.toggleMenu = function() {
    $mdSidenav('left').toggle();
  };

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
      $scope.inputData.appreciationRate =5;

  });
};
$scope.getDefaults();


var service = ClientService;

$scope.$watchCollection('inputData', function(newVal, oldVal){
    console.log('Changed', newVal, oldVal);

    //this is for finding the selling house value
    var appreciationFunction= function(input){
      //mortgage rate per month
      $scope.mortMonth=newVal.mortgageRate/12/100;
      $scope.mortYearMonth=newVal.mortgageYears*12;
      $scope.principle=newVal.targetPrice-(newVal.targetPrice*newVal.downPaymentPercentage/100);

      $scope.monthlyPayment=($scope.principle*($scope.mortMonth*Math.pow((1+$scope.mortMonth),$scope.mortYearMonth)))/(Math.pow((1+$scope.mortMonth),$scope.mortYearMonth)-1);
      $scope.constant=Math.pow((1+$scope.mortMonth),$scope.mortYearMonth);
      $scope.otherConstant=Math.pow((1+$scope.mortMonth),(input));
      $scope.balance=$scope.principle*($scope.constant-$scope.otherConstant)/($scope.constant-1);


      $scope.newHomeValue=$scope.principle*Math.pow(Math.E,input*newVal.appreciationRate/100/12);

      $scope.valueGained=$scope.newHomeValue-$scope.principle;

      return $scope.valueGained

    };
    appreciationFunction(newVal.years*12);
    console.log("check", appreciationFunction(newVal.years*12) )


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
        $scope.monthPrice=$scope.otherYears/12
        //actual yearwise
        $scope.buy[1].v = $scope.firstYear+($scope.otherYears*(newVal.years-1))-$scope.valueGained;
        console.log($scope.buy[1].v);

    //Renting related

      $scope.rentHold=newVal.monthlyRentPersonal*12+newVal.utils
      $scope.rent[1].v = $scope.rentHold*newVal.years;



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




      $scope.buyValues = [];
      $scope.rentValues = [];
      $scope.buyAndRentValues = [];
      // var buyValues = [10000,20000,30000,40000,50000];
      // var rentValues = [20000,40000,60000,40000,60000];
      // var buyAndRentValues = [60000,40000,50000,30000,20000];

      count=0;
      var rentFunction= function(){ //TODO The other graph works, this one needs some seriously new
        for(var i=0;i<newVal.years*12;i++){
          count++;

          if(i==0){
            $scope.buyValues.push(newVal.targetPrice*newVal.downPaymentPercentage/100);
          }
          else if(i<=newVal.mortgageYears*12){
            $scope.buyValues.push($scope.monthPrice*i-appreciationFunction(i)+newVal.targetPrice*newVal.downPaymentPercentage/100);
          }
          else{
            $scope.buyValues.push($scope.monthPrice*newVal.mortgageYears*12-appreciationFunction(i)+newVal.targetPrice*newVal.downPaymentPercentage/100);
          }


          if(count>newVal.targetPrice/$scope.depPersProp){
              $scope.depPersProp=0;
          }

          if(count>newVal.targetPrice/$scope.depLandImprovVal){
              $scope.depLandImprovVal=0;
          }

          if(count>newVal.targetPrice/$scope.depBuildingValue){
              $scope.depBuildingValue=0;
          }

          $scope.depPersProp=0/12;
          $scope.depLandImprovVal=0/12;
          $scope.depBuildingValue=0/12;

          $scope.totDepMonth=$scope.depBuildingValue+$scope.depLandImprovVal+$scope.depPersProp;

          if(i==0){
            $scope.buyAndRentValues.push(newVal.targetPrice*newVal.downPaymentPercentage/100-($scope.rentTenantAnnual/12));
          }
          else if(i<newVal.mortgageYears*12){
            $scope.buyAndRentValues.push($scope.monthPrice*i-appreciationFunction(i)+(newVal.targetPrice*newVal.downPaymentPercentage/100)-($scope.rentTenantAnnual/12)-$scope.totDepMonth*i);
          }
          else{
            $scope.buyAndRentValues.push($scope.monthPrice*newVal.mortgageYears*12-appreciationFunction(i)+newVal.targetPrice*newVal.downPaymentPercentage/100-$scope.depBuildingValue-$scope.depLandImprovVal-$scope.depPersProp);
          }

          $scope.rentValues.push(newVal.monthlyRentPersonal*i)
          // $scope.buyValues.push(appreciationFunction(i));
        };
      };

      rentFunction();


      console.log("duck",$scope.buyValues);

      var dynamicRows = [];
      var populateDynamicRows = function(){
          for (var i = 0; i < newVal.years*12; i++) {
              var newRow = {
                              "c":
                                  [
                                      {
                                          "v": i
                                      },
                                      {
                                          "v": $scope.buyValues[i]
                                      },
                                      {
                                          "v": $scope.rentValues[i]
                                      },
                                      {
                                          "v": $scope.buyAndRentValues[i]
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
