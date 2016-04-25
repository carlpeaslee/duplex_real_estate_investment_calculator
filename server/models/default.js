var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Default_Values = new Schema({
  zip_code: { type: Number},
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
