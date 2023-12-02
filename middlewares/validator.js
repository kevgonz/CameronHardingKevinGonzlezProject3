const {validationResult} = require('express-validator');
const {body} = require('express-validator');


exports.validateSignUp = [body('firstName', 'First name cannot be empty').notEmpty().trim().escape(),
body('lastName', 'First name cannot be empty').notEmpty().trim().escape(),
body('email', 'Email must be valid').isEmail().trim().escape().normalizeEmail(),
body('password', 'Password must be atleast 8 characters and at most 64 characters').isLength({min:8, max:64})];

exports.validateLogIn = [body('email', 'Email must be valid').isEmail().trim().escape().normalizeEmail(),
body('password', 'Password must be atleast 8 characters and at most 64 characters').isLength({min:8, max:64})];

exports.validateResults = (req, res, next)=>{
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        errors.array().forEach(error=>{
            req.flash('error', error.msg);
    });
    return res.redirect('back');
  }else{
    return next();
  }
};