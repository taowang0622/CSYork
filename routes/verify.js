exports.verifyUser = function (req, res, next) {
    if(req.user === undefined){
        var err = new Error('You are not authenticated');
        err.status = 401;
        return next(err);
    }
    next();
};