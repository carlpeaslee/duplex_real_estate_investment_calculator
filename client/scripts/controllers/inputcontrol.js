chickApp.controller('InputController',  ['$scope', '$http', '$window', 'ClientService',function($scope, $http, $window, ClientService) {
//Independent Variables
$scope.monthlyRentPersonal=1500;
$scope.monthlyRentTenant=1600;
$scope.targetPrice=7000000;
$scope.downPaymentPercentage=.5;
$scope.mortgageRate=1000;
$scope.yearsAmmoritized=500;
$scope.income=100;
$scope.mortgageYears=30;
$scope.vacancy=.05
$scope.propertyTaxes=4000;

//Dependent variables
$scope.downPaymentValue=$scope.targetPrice*($scope.downPaymentPercentage/100)
$scope.monthlyCost=($scope.targetPrice-$scope.downPaymentValue)*($scope.mortgageRate/12)*Math.pow((1+$scope.mortgageRate/12),($scope.mortgageYears*12))/(Math.pow((1+$scope.mortgageRate/12),($scope.mortgageYears*12))-1)
$scope.annualCost=$scope.monthlyCost*12
$scope.landValue=$scope.targetPrice*.25
$scope.personalPropertyValue=$scope.targetPrice*.05
$scope.personalPropertyDepreciation=$scope.personalPropertyValue*.2
$scope.buildingValue=$scope.targetPrice*.5
$scope.buildingDepreciation=$scope.buildingValue*.0348
$scope.landImprovementValue=$scope.targetPrice*.2
$scope.landImprovementDeprecation=$scope.landImprovementValue*.05
$scope.totalDepreciation=$scope.personalPropertyDepreciation+$scope.buildingDepreciation+$scope.landImprovementDeprecation;
$scope.annualRent=$scope.monthlyRentTenant*12
$scope.grossOperatingIncome=$scope.annualRent*(1-$scope.vacancy)








}]);
