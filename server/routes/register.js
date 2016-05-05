var express = require('express');
var router = express.Router();
var Admin = require("../models/admin.js");

router.post('/reg', function(req, res, next){
    Admin.create(req.body, function(err, post){
        if(err){
            next(err);
        }else{
            res.redirect('/');
        }
    });
});

module.exports = router;
