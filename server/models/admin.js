var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 12;

var Admin = new Schema({
  username: { type: String, required: true },
  password: {type: String, required: true },

});

AdminSchema.pre('save', function(next){
   var admin = this;
   if(!admin.isModified('password')) return next;
   bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
       if(err) return next(err);
       bcrypt.hash(admin.password, salt, function(err, hash){
           if(err) return next(err);
           admin.password = hash;
           next();
       });
   });
});
AdminSchema.methods.comparePassword = function(canidatePassword, cb){
   bcrypt.compare(canidatePassword, this.password, function(err, isMatch){
       if(err) return cb(err);
     });
};

module.exports = mongoose.model("Admin", Admin);
