const checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    /** user is authenticated, so we do not
     * need to redirect them
     */
    req.headers.userrole = req.user.role;
    return next();
  } else {
    /** user is not authenticated, so add a session
     * cookie telling our server where to redirect to
     */
    req.session.redirectTo = req.url;
    res.redirect("/login");
  }
};

module.exports = checkAuth;
