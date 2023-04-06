module.exports = (req, res, next) => {
    if (req.session.userId && req.session.role !== "admin") {
        const error = "You have no access";
        res.redirect(`/login?error=${error}`);
    } else {
        next();
    }
}

