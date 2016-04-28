var express = require('express');
var router = express.Router();
var Default = require("../models/default.js");

router.route('/')
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
            monthly_rent_def: req.body.monthly_rent_def,
            monthly_rent_min: req.body.monthly_rent_min,
            monthly_rent_max: req.body.monthly_rent_max,
            buying_budget_def: req.body.buying_budget_def,
            buying_budget_min: req.body.buying_budget_min,
            buying_budget_max: req.body.buying_budget_max,
            estimated_rental_income_def: req.body.estimated_rental_income_def,
            estimated_rental_income_min: req.body.estimated_rental_income_min,
            estimated_rental_income_max: req.body.estimated_rental_income_max,
            amortization_interest_rate_def: req.body.amortization_interest_rate_def,
            amortization_interest_rate_min: req.body.amortization_interest_rate_min,
            amortization_interest_rate_max: req.body.amortization_interest_rate_max,
            downpayment_def: req.body.downpayment_def,
            downpayment_min: req.body.downpayment_min,
            downpayment_max: req.body.downpayment_max,
            property_taxes_def: req.body.property_taxes_def,
            property_taxes_min: req.body.property_taxes_min,
            property_taxes_max: req.body.property_taxes_max,
            toggle_married_or_single: req.body.toggle_married_or_single,
            annual_income_def: req.body.annual_income_def,
            annual_income_min: req.body.annual_income_min,
            annual_income_max: req.body.annual_income_max,
            maintainence_costs_def: req.body.maintainence_costs_def,
            maintainence_costs_min: req.body.maintainence_costs_min,
            maintainence_costs_max: req.body.maintainence_costs_max,
            additional_monthly_expenses_def: req.body.additional_monthly_expenses_def,
            additional_monthly_expenses_min: req.body.additional_monthly_expenses_min,
            additional_monthly_expenses_max: req.body.additional_monthly_expenses_max,
            home_value_increase_def: req.body.home_value_increase_def,
            home_value_increase_min: req.body.home_value_increase_min,
            home_value_increase_max: req.body.home_value_increase_max,
            rental_increase_def: req.body.rental_increase_def,
            rental_increase_min: req.body.rental_increase_min,
            rental_increase_max: req.body.rental_increase_max,
            auto_calc_depreciation_def: req.body.auto_calc_depreciation_def,
            auto_calc_depreciation_min: req.body.auto_calc_depreciation_min,
            auto_calc_depreciation_max: req.body.auto_calc_depreciation_max
        });
        defaults.save(function(err, defaults){
            if(err) console.log(err);
            res.send(defaults);
        });
    });

    router.route('/:id').put(function(req, res){
        Default.findById(req.body._id, function(err, defaults){
            if(err) res.send(err);
            console.log(req.body);

            defaults.monthly_rent_def = req.body.monthly_rent_def;
            defaults.monthly_rent_min = req.body.monthly_rent_min;
            defaults.monthly_rent_max = req.body.monthly_rent_max;
            defaults.buying_budget_def = req.body.buying_budget_def;
            defaults.buying_budget_min = req.body.buying_budget_min;
            defaults.buying_budget_max = req.body.buying_budget_max;
            defaults.estimated_rental_income_def = req.body.estimated_rental_income_def;
            defaults.estimated_rental_income_min = req.body.estimated_rental_income_min;
            defaults.estimated_rental_income_max = req.body.estimated_rental_income_max;
            defaults.amortization_interest_rate_def = req.body.amortization_interest_rate_def;
            defaults.amortization_interest_rate_min = req.body.amortization_interest_rate_min;
            defaults.amortization_interest_rate_max = req.body.amortization_interest_rate_max;
            defaults.downpayment_def = req.body.downpayment_def;
            defaults.downpayment_min = req.body.downpayment_min;
            defaults.downpayment_max = req.body.downpayment_max;
            defaults.property_taxes_def = req.body.property_taxes_def;
            defaults.property_taxes_min = req.body.property_taxes_min;
            defaults.property_taxes_max = req.body.property_taxes_max;
            defaults.toggle_married_or_single = req.body.toggle_married_or_single;
            defaults.annual_income_def = req.body.annual_income_def;
            defaults.annual_income_min = req.body.annual_income_min;
            defaults.annual_income_max = req.body.annual_income_max;
            defaults.maintainence_costs_def = req.body.maintainence_costs_def;
            defaults.maintainence_costs_min = req.body.maintainence_costs_min;
            defaults.maintainence_costs_max = req.body.maintainence_costs_max;
            defaults.additional_monthly_expenses_def = req.body.additional_monthly_expenses_def;
            defaults.additional_monthly_expenses_min = req.body.additional_monthly_expenses_min;
            defaults.additional_monthly_expenses_max = req.body.additional_monthly_expenses_max;
            defaults.home_value_increase_def = req.body.home_value_increase_def;
            defaults.home_value_increase_min = req.body.home_value_increase_min;
            defaults.home_value_increase_max = req.body.home_value_increase_max;
            defaults.rental_increase_def = req.body.rental_increase_def;
            defaults.rental_increase_min = req.body.rental_increase_min;
            defaults.rental_increase_max = req.body.rental_increase_max;
            defaults.auto_calc_depreciation_def = req.body.auto_calc_depreciation_def;
            defaults.auto_calc_depreciation_min = req.body.auto_calc_depreciation_min;
            defaults.auto_calc_depreciation_max = req.body.auto_calc_depreciation_max;

            defaults.save(function(err){
                if(err) res.send(err);
                res.json({message: 'defaults have been updated!'});
            });
        });
    });

module.exports = router;
