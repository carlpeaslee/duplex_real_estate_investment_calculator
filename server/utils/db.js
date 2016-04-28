var express = require('express');
var router = express.Router();
var Default = require("../models/default.js");

/* initValues are for the initial startup of a server so they
can populate the calculator on the client-side. */

var initValues = new Default({
    // monthly_rent_def:  ,
    // monthly_rent_min:  ,
    // monthly_rent_max:  ,
    //
    // buying_budget_def:  ,
    // buying_budget_min:  ,
    // buying_budget_max:  ,
    //
    // estimated_rental_income_def:  ,
    // estimated_rental_income_min:  ,
    // estimated_rental_income_max:  ,
    //
    // amortization_interest_rate_def:  ,
    // amortization_interest_rate_min:  ,
    // amortization_interest_rate_max:  ,
    //
    // downpayment_def:  ,
    // downpayment_min:  ,
    // downpayment_max:  ,
    //
    // property_taxes_def:  ,
    // property_taxes_min:  ,
    // property_taxes_max:  ,
    //
    // toggle_married_or_single:  , //string!!!!
    //
    // annual_income_def:  ,
    // annual_income_min:  ,
    // annual_income_max:  ,
    //
    // maintainence_costs_def:  ,
    // maintainence_costs_min:  ,
    // maintainence_costs_max:  ,
    //
    // additional_monthly_expenses_def:  ,
    // additional_monthly_expenses_min:  ,
    // additional_monthly_expenses_max:  ,
    //
    // home_value_increase_def:  ,
    // home_value_increase_min:  ,
    // home_value_increase_max:  ,
    //
    // rental_increase_def:  ,
    // rental_increase_min:  ,
    // rental_increase_max:  ,
    //
    // auto_calc_depreciation_def:  ,
    // auto_calc_depreciation_min:  ,
    // auto_calc_depreciation_max:
});



module.exports = router;
