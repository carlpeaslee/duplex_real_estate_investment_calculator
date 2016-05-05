var express = require('express');
var router = express.Router();
var Admin = require("../models/admin.js");

router.get("/", function(req, res, next){
  res.json(req.isAuthenticated());
});

router.post('/reg', function(req, res, next){
    Admin.create(req.body, function(err, post){
        if(err){
            next(err);
        }else{
            res.redirect('/');
        }
    });
});

router.get("/contacts", function(req, res, next){
  console.log("In routes admin.js ", req.isAuthenticated());
  var resAdmin = {
    username: req.admin.username
  };
  res.json(resAdmin);
});

module.exports = router;
