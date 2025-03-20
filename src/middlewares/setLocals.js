const setLocals = (req, res, next) => {
    res.locals.user = req.user || null;

    next();
}

export default setLocals;