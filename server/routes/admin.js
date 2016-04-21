var express = require('express');
var router = express.Router();
var Admin = require("../models/admin.js");

router.get("/", function(req, res, next){
  res.json(req.isAuthenticated());
});

router.get("/name", function(req, res, next){
  console.log("In routes admin.js ", req.isAuthenticated());
  var resAdmin = {
    username: req.admin.username,
    datecreated: req.user.lastlogin
  };
  res.json(resAdmin);
});

module.exports = router;
