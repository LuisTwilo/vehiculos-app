const utils = {};

utils.isAuthenticated = (req, res, next) =>{
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'El usuario no está autorizado');
    res.redirect('/user/login');
}

module.exports = utils;