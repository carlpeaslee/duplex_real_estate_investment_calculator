var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Default_Values = new Schema({
  zip_code: { type: Number, min: 5, max: 10 },
  monthly_rent: { type: Number },
  buying_budget: { type: Number },
  estimated_rental_income: { type: Number },
  amortization_interest_rate: { type: Number },
  downpayment: { type: Number },
  property_taxes: {type: Number },
  toggle_married_or_single: { type: Boolean },
  annual_income: {type: Number },
  maintainence_costs: {type: Number },
  additional_monthly_expenses: { type: Number },
  home_value_increase: { type: Number },
  rental_increase: { type: Number },
  auto_calc_depreciation: { type: Number }
});

module.exports = mongoose.model("Default_Values", Default_Values);


/* TODO

max, min, and default needed:

target home price

down payment percentange

annual income

annual homeowners insurance percentage

association fees

maintenence percentage

montly additional expenses

annual home value increase

annual rental increase

monthly rent if you rented instread of buying
*/


/* TODO setup routes for these values then setup http calls in fasctory
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
*/
