chickApp.controller('InputController',  ['$scope', '$log', '$http', '$window', '$mdSidenav', "$mdDialog", "$mdMedia", 'ClientService',function($scope, $log, $http, $window, $mdSidenav, $mdDialog, $mdMedia, ClientService) {
    //Independent Variables
    var clientService = ClientService;

    // $scope.showAlert = function(ev) {
    //     $mdDialog.show(
    //       $mdDialog.alert()
    //         .parent(angular.element(document.querySelector('#all')))
    //         // .openFrom(angular.element(document.querySelector('#zip-code')))
    //         // .closeTo(angular.element(document.querySelector('#zip-code')))
    //         .clickOutsideToClose(true)
    //         .title("Let's get started!")
    //         .textContent('You can specify some description text in here.')
    //         .ariaLabel('Alert Dialog Demo')
    //         .ok('Got it!')
    //         .targetEvent(ev)
    //     );
    // };
    //
    // $scope.showAlert();

    $scope.toggleMenu = function() {
        $mdSidenav('left').toggle();
    };

    // clientService.submitEmail(contactPackage);
    // $scope.submit.email = "";
    // $scope.fade = "";


$scope.inputData = {};

$scope.minMax = {};

$scope.getDefaults = function() {
  $http.get("/defaults").then(function(response){
      defaultVariables = response.data[0];
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
      $scope.inputData.propertyTax= defaultVariables.propertyTaxDef;
      $scope.inputData.assocDues= defaultVariables.assocDuesDef;
      $scope.inputData.management= defaultVariables.managementDef;
      $scope.inputData.misc= defaultVariables.miscDef;
      $scope.inputData.insuranceAnnual= defaultVariables.insuranceAnnualDef;
      $scope.inputData.utils= defaultVariables.utilsDef;
      $scope.inputData.legalAccounting= defaultVariables.legalAccountingDef;
      $scope.inputData.taxBracket= defaultVariables.taxBracketDef;
      $scope.inputData.repairValue= defaultVariables.repairValueDef;
      $scope.inputData.years= defaultVariables.yearsDef;
      $scope.inputData.maritalStatus = false;
      $scope.inputData.zipCode = defaultVariables.zipCode;
      $scope.inputData.appreciationRate =defaultVariables.appreciationRateDef;
      $scope.inputData.renterInsurance = defaultVariables.renterInsuranceDef;

  });
};
$scope.getDefaults();


var service = ClientService;

$scope.$watchCollection('inputData', function(newVal, oldVal){
    console.log(newVal, "newval")
    var incomeTaxBracket =function(income){
      if(newVal.maritalStatus==false){
        if(newVal.income<=9225){
          incomeTax=10
        }else if(newVal.income<=37450){
          incomeTax=15
        }else if(newVal.income<=90750){
          incomeTax=25
        }else if(newVal.income<=189300){
          incomeTax=28
        }else if(newVal.income<=411500){
          incomeTax=33
        }else if(newVal.income<=411500){
          incomeTax=33
        }else if(newVal.income<=413200){
          incomeTax=35
        }else{
          incomeTax=39.6
        }
      }else{
        if(newVal.income<=18450){
          incomeTax=10
        }else if(newVal.income<=37450*2){
          incomeTax=15
        }else if(newVal.income<=90750*2){
          incomeTax=25
        }else if(newVal.income<=189300*2){
          incomeTax=28
        }else if(newVal.income<=411500*2){
          incomeTax=33
        }else if(newVal.income<=411500*2){
          incomeTax=33
        }else if(newVal.income<=413200*2){
          incomeTax=35
        }else{
          incomeTax=39.6
        }
      }
      return incomeTax;
    }
  var capitalGainsTax= function(){
    var iTB=incomeTaxBracket();
    if(iTB==10){
      cGT=10
    }else if(iTB==15){
      cGT=15
    }else{
      cGT=25;
    }
    return cGT
}
  //calculate Principle
  var principle = function(){
    var hold=newVal.targetPrice-(newVal.targetPrice*newVal.downPaymentPercentage/100);
    return hold
  };



  //calculate monthly mortgage payments
  var mortgageMonthlyPayments=function(mortgageTerm){
    hold= (newVal.mortgageRate/12/100)*principle();
    var interestRateTerm=Math.pow((1+newVal.mortgageRate/12/100),(mortgageTerm*-1));
    monthPay= hold/(1-(interestRateTerm));
    return monthPay
  };

  var monthlyOperatingExpenses=function(){
    var repairs=.006*newVal.targetPrice;
    var legal = 100;
    var total= newVal.propertyTax+repairs+newVal.utils+legal+newVal.insuranceAnnual;
    return total/12;
  }


    var balanceFunction = function(howMuchTime){
      var rateIncrease=1+newVal.mortgageRate/12/100;
      var rateTime= Math.pow(rateIncrease,howMuchTime);
      var principleRateTime=principle()*rateTime;
      var payment = mortgageMonthlyPayments(newVal.mortgageYears*12);
      var rateTimeMinusOne=rateTime-1;
      var monthRate= newVal.mortgageRate/12/100;
      var minusBal= (rateTimeMinusOne/monthRate)*payment;
      var balance = principleRateTime-minusBal
      return balance;
    };

    //continous appreciation
    var appreciationFunction = function(howMuchTime){
      var p=principle();
      var a=1+newVal.appreciationRate/12/100
      var t=howMuchTime;
      var part=p*Math.pow(a,t);
      part=part-principle();

      return part;
    };



    var saleFunction = function(howMuchTime){
      var tot=appreciationFunction(howMuchTime)-balanceFunction(howMuchTime);
      tot=tot*(1-capitalGainsTax()/100);
      return tot;
  };

  //depreciation total over the time
    var decpreciationFunction= function(howMuchTime){
      var personalPropertyDep=howMuchTime*newVal.targetPrice*(.05*.2);
        if (personalPropertyDep>=newVal.targetPrice*.05){
          personalPropertyDep=newVal.targetPrice*.05
        }

      var buildingValueDep=howMuchTime*newVal.targetPrice*(.5*.0348);
        if (buildingValueDep>=newVal.targetPrice*.5){
          buildingValueDep=newVal.targetPrice*.5
        }

      var landImprovementDep=howMuchTime*newVal.targetPrice*(.05*.2);
        if (landImprovementDep>=newVal.targetPrice*.2){
          landImprovementDep=newVal.targetPrice*.2
        }

      var totDep=landImprovementDep+buildingValueDep+personalPropertyDep;
      var totDep=totDep/12/2;


      return totDep;
    };

    //rental information over whole time TODO NOT WORKING
    var rentFunction= function(howMuchTime){
      rent=newVal.monthlyRentTenant*howMuchTime;

      insurance=newVal.renterInsurance*howMuchTime;

      rentTot=rent+insurance+newVal.utils*howMuchTime;
      return rentTot
    };
    console.log(rentFunction(newVal.years*12), "Test")

    //buy function over all time
    var buyFunctionMonthCostDuringMortgageTerm= function(){
        var monthCost=mortgageMonthlyPayments(newVal.mortgageYears*12);
        var operatingCosts=monthlyOperatingExpenses()
        var tot=operatingCosts+monthCost;
        return tot
    }

    var buyFunctionMonthCostPostMortgageTerm=function(){
      var tot=monthlyOperatingExpenses();
      return tot
    }


    var totalBuy=function(howMuchTime){
      downPayment=newVal.downPaymentPercentage/100*newVal.targetPrice;
      if(howMuchTime<=newVal.mortgageYears*12){
        normalPay=buyFunctionMonthCostDuringMortgageTerm()*howMuchTime
      }else{
        firstPart=buyFunctionMonthCostDuringMortgageTerm()*newVal.mortgageYears*12
        secondPart=(newVal.mortgageYears*12-howMuchTime)*buyFunctionMonthCostPostMortgageTerm();
        normalPay=firstPart+secondPart;
      }
      totalPay=normalPay+downPayment-appreciationFunction(howMuchTime);
      return totalPay;
    }



    var totDuplex=function(howMuchTime){
      var buySame=totalBuy(howMuchTime);
      var dep = decpreciationFunction(howMuchTime);
      var tot= buySame-dep;
      return tot
    }

      $scope.buy[1].v =totalBuy(newVal.years*12);
      $scope.rent[1].v = rentFunction(newVal.years*12);
      $scope.buyAndRent[1].v = totDuplex(newVal.years*12);



      $scope.buyValues = [];
      $scope.rentValues = [];
      $scope.buyAndRentValues = [];

      count=0;
      var absoluteFunction= function(){
        for(var i=0;i<newVal.years*12;i++){
          count++;
          $scope.buyValues.push(totalBuy(i));
          $scope.buyAndRentValues.push(totDuplex(i));
          $scope.rentValues.push(rentFunction(i));
        };
      };



      absoluteFunction();

      console.log($scope.buyValues.length)


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
              "title": "Long term Cost on Investment",
              "isStacked": true,
              "fill": 20,
              "displayExactValues": true,
              "vAxis": {
                  "title": "Return",
                  viewWindowMode:'explicit',
                  viewWindow:{
                    min:0.0
                  }
              },
              "hAxis": {
                  "title": "Months"
              },
              "animation":{
                  duration: 300,
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



    $scope.submit = {};
    $scope.submit.followup = true;





}]);
