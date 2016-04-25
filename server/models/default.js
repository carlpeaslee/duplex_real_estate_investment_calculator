var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// TODO enter min and max values.

var Default_Values = new Schema({

  monthly_rent_def: { type: Number },
  monthly_rent_min: { type: Number },
  monthly_rent_max: { type: Number },

  buying_budget_def: { type: Number },
  buying_budget_min: { type: Number },
  buying_budget_max: { type: Number },

  estimated_rental_income_def: { type: Number },
  estimated_rental_income_min: { type: Number },
  estimated_rental_income_max: { type: Number },

  amortization_interest_rate_def: { type: Number },
  amortization_interest_rate_min: { type: Number },
  amortization_interest_rate_max: { type: Number },

  downpayment_def: { type: Number },
  downpayment_min: { type: Number },
  downpayment_max: { type: Number },

  property_taxes_def: {type: Number },
  property_taxes_min: { type: Number },
  property_taxes_max: { type: Number },

  toggle_married_or_single: { type: Boolean },

  annual_income_def: {type: Number },
  annual_income_min: { type: Number },
  annual_income_max: { type: Number },

  maintainence_costs_def: {type: Number },
  maintainence_costs_min: { type: Number },
  maintainence_costs_max: { type: Number },

  additional_monthly_expenses_def: { type: Number },
  additional_monthly_expenses_min: { type: Number },
  additional_monthly_expenses_max: { type: Number },

  home_value_increase_def: { type: Number },
  home_value_increase_min: { type: Number },
  home_value_increase_max: { type: Number },

  rental_increase_def: { type: Number },
  rental_increase_min: { type: Number },
  rental_increase_max: { type: Number },

  auto_calc_depreciation_def: { type: Number },
  auto_calc_depreciation_min: { type: Number },
  auto_calc_depreciation_max: { type: Number }
});

module.exports = mongoose.model("Default_Values", Default_Values);
