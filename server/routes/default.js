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
            monthly_rent_def: req.body.  ,
            monthly_rent_min: req.body.  ,
            monthly_rent_max: req.body.  ,
            buying_budget_def: req.body.  ,
            buying_budget_min: req.body.  ,
            buying_budget_max: req.body.  ,
            estimated_rental_income_def: req.body.  ,
            estimated_rental_income_min: req.body.  ,
            estimated_rental_income_max: req.body.  ,
            amortization_interest_rate_def: req.body.  ,
            amortization_interest_rate_min: req.body.  ,
            amortization_interest_rate_max: req.body.  ,
            downpayment_def: req.body.  ,
            downpayment_min: req.body.  ,
            downpayment_max: req.body.  ,
            property_taxes_def: req.body.  ,
            property_taxes_min: req.body.  ,
            property_taxes_max: req.body.  ,
            toggle_married_or_single: req.body.  ,
            annual_income_def: req.body.  ,
            annual_income_min: req.body.  ,
            annual_income_max: req.body.  ,
            maintainence_costs_def: req.body.  ,
            maintainence_costs_min: req.body.  ,
            maintainence_costs_max: req.body.  ,
            additional_monthly_expenses_def: req.body.  ,
            additional_monthly_expenses_min: req.body.  ,
            additional_monthly_expenses_max: req.body.  ,
            home_value_increase_def: req.body.  ,
            home_value_increase_min: req.body.  ,
            home_value_increase_max: req.body.  ,
            rental_increase_def: req.body.  ,
            rental_increase_min: req.body.  ,
            rental_increase_max: req.body.  ,
            auto_calc_depreciation_def: req.body.  ,
            auto_calc_depreciation_min: req.body.  ,
            auto_calc_depreciation_max: req.body.
        });
    })

module.exports = router;



/* TODO

1. create entire list of vars from front end
2. modify schema to match
3. create code tp save to DB
4. create .put request on line 53
5. figure out how the hell we'll save intial vars once with .post request then
    only ever use .put afterwards to update.

*/
