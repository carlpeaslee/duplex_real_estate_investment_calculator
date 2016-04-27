var express = require('express');
var router = express.Router();
var Default = require("../models/default.js");

router.route('/defaults')
    .get(function(req, res){
        Default.find(function(err, defaults){
            if(err){console.log(err);}
            res.send(defaults);
        });
    })
    /*  the following post route will only ever be used once.
     *  it is there to provide the initial values for the calculator
     *  which will be generated everytime this application is
     *  loaded fresh on a new server.
     */
    .post(function(req, res){
        var defaults = new Default({
            monthly_rent_def: req.body.initialValues.monthly_rent_def,
            monthly_rent_min: req.body.initialValues.monthly_rent_min,
            monthly_rent_max: req.body.initialValues.monthly_rent_max,
            buying_budget_def: req.body.initialValues.buying_budget_def,
            buying_budget_min: req.body.initialValues.buying_budget_min,
            buying_budget_max: req.body.initialValues.buying_budget_max,
            estimated_rental_income_def: req.body.initialValues.estimated_rental_income_def,
            estimated_rental_income_min: req.body.initialValues.estimated_rental_income_min,
            estimated_rental_income_max: req.body.initialValues.estimated_rental_income_max,
            amortization_interest_rate_def: req.body.initialValues.amortization_interest_rate_def,
            amortization_interest_rate_min: req.body.initialValues.amortization_interest_rate_min,
            amortization_interest_rate_max: req.body.initialValues.amortization_interest_rate_max,
            downpayment_def: req.body.initialValues.downpayment_def,
            downpayment_min: req.body.initialValues.downpayment_min,
            downpayment_max: req.body.initialValues.downpayment_max,
            property_taxes_def: req.body.initialValues.property_taxes_def,
            property_taxes_min: req.body.initialValues.property_taxes_min,
            property_taxes_max: req.body.initialValues.property_taxes_max,
            toggle_married_or_single: req.body.initialValues.toggle_married_or_single,
            annual_income_def: req.body.initialValues.annual_income_def,
            annual_income_min: req.body.initialValues.annual_income_min,
            annual_income_max: req.body.initialValues.annual_income_max,
            maintainence_costs_def: req.body.initialValues.maintainence_costs_def,
            maintainence_costs_min: req.body.initialValues.maintainence_costs_min,
            maintainence_costs_max: req.body.initialValues.maintainence_costs_max,
            additional_monthly_expenses_def: req.body.initialValues.additional_monthly_expenses_def,
            additional_monthly_expenses_min: req.body.initialValues.additional_monthly_expenses_min,
            additional_monthly_expenses_max: req.body.initialValues.additional_monthly_expenses_max,
            home_value_increase_def: req.body.initialValues.home_value_increase_def,
            home_value_increase_min: req.body.initialValues.home_value_increase_min,
            home_value_increase_max: req.body.initialValues.home_value_increase_max,
            rental_increase_def: req.body.initialValues.rental_increase_def,
            rental_increase_min: req.body.initialValues.rental_increase_min,
            rental_increase_max: req.body.initialValues.rental_increase_max,
            auto_calc_depreciation_def: req.body.initialValues.auto_calc_depreciation_def,
            auto_calc_depreciation_min: req.body.initialValues.auto_calc_depreciation_min,
            auto_calc_depreciation_max: req.body.initialValues.auto_calc_depreciation_max
        });
        defaults.save(function(err, defaults){
            if(err) console.log(err);
            res.send(defaults);
        });
    });
    // .put(function())

module.exports = router;



/* TODO
 update entire list of vars from front end


*/
