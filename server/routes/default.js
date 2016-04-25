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
    .post(function(req, res){
        var defaults = new Default({
            zip_code: req.body.  ,
            monthly_rent: req.body.  ,
            buying_budget: req.body.  ,
            estimated_rental_income: req.body.  ,
            amortization_interest_rate: req.body.  ,
            downpayment: req.body.  ,
            property_taxes: req.body.  ,
            toggle_married_or_single: req.body.  ,
            annual_income: req.body.  ,
            maintainence_costs: req.body.  ,
            additional_monthly_expenses: req.body.  ,
            home_value_increase: req.body.  ,
            rental_increase: req.body.  ,
            auto_calc_depreciation: req.body.
        });
    })

module.exports = router;



/* TODO

1. create entire list of vars from front end
2. modify schema to match
3. create code tp save to DB
4. create .put request
5. figure out how the hell we'll save intial vars once with .post request then
    only ever use .put afterwards to update.

*/
