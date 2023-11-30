const User = require('../models/user');

exports.login = (req, res) => {
    res.render("./user/login");
  };

  exports.signup = (req, res) => {
    res.render("./user/new");
  };

  exports.create = (req, res, next) => {
    let user = new User(req.body);
    user.save()
    .then(()=> res.redirect('./user/login'))
    .catch(err=>next(err));
  };

  exports.authenticate = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({email: email})
    .then(user=>{
        if(user){
            user.comparePassword(password)
            .then(result=>{
                if(result){
                    res.redirect('./user/profile');
                }else{
                    console.log('wrong Password');
                    res.redirect('./user/login');
                }
            })
        }else{
            console.log('wrong email address');
            res.redirect('./user/login');
        }
    })
    .catch(err=>next(err));
  };

  exports.profile = (req, res) => {
    res.render("./user/profile");
  };