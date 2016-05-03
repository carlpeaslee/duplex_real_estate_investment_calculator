var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Contact = new Schema({
    email: { type: String, required: true},
    marital_status: { type: String, required: false},
    zip_code: { type: String, required: false},
    income: { type: String, required: false},
    target_property_price: { type: String, required: false},
    date: {type: String, required: false},
    status: {type: String, required: false},
    followup: {type: String, required: false}
});

module.exports = mongoose.model("Contact", Contact);
