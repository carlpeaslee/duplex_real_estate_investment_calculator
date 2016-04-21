var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Contact = new Schema({
  email: { type: String, required: true}
});

module.exports = mongoose.model("Contact", Contact);
