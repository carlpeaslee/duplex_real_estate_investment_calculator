var express = require('express');
var router = express.Router();
var Submit = require("../models/contact.js");

router.post("/submit", function(req, res){
  console.log("User submitted this email: ", req);
  Submit.create(req.body, function(err, post){
    if(err){
      console.log(err);
    }
  });
});



/*TODO
    add date cteated to save alongside saved e-mails.




*/



module.exports = router;
