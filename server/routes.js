/**
 * Main application routes
 */

'use strict';

// var errors = require('./components/errors');

module.exports = function (app, passport) {

  // Insert routes below
  // app.use('/api/things', require('./api/thing'));
  // app.use('/api/users', require('./api/user'));
  //
  // app.use('/auth', require('./auth'));

  // process the login form
  // app.post('/login', do all our passport stuff here);

  // process the signup form
  // app.post('/signup', do all our passport stuff here);

  // // =====================================
  // // PROFILE SECTION =====================
  // // =====================================
  // // we will want this protected so you have to be logged in to visit
  // // we will use route middleware to verify this (the isLoggedIn function)
  // app.get('/profile', isLoggedIn, function (req, res) {
  //   res.render('profile.ejs', {
  //     user: req.user // get the user out of session and pass to template
  //   });
  // });

  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  // All undefined asset or api routes should return a 404
  // app.route('/:url(api|auth|components|app|bower_components|assets)/*')
  //   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function (req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}