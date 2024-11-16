const createCsrf = (req, res, next) => {
    // res.locals.csrfToken = req.csrfToken();
    res.locals.user = req.session.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
}

const csrfError = (err, req, res, next) => {
    // if (err) {
    //     console.log(err);
    //     return res.render('error');
    // }
    next();
}

const userRequired = (req, res, next) => {
    if (!req.session.user) {
        req.flash("error", "Faça login para acessar a página");
        return res.redirect('/login');
    }
    next();
}

export {
    createCsrf,
    csrfError,
    userRequired
}