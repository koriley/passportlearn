const express = require('express');
const passport = require('passport');
const ghStrat = require('passport-github').Strategy;
const session = require('express-session');

passport.use(new ghStrat({
  clientID: "b5fcec34f0c2c467396e",
  clientSecret: "cc91ff821736a0a560eef68dae36c8ead6a6b7d8",
  callbackURL: "http://localhost:30000/auth/github/callback"
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));


var app = express();

app.use(session({
  secret: "--something--"
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/callback', passport.authenticate('github', {
  failureRedirect: '/'
}), (req, res) => {
  res.redirect('/user');
});

app.get('/', (req, res) => {
  var html =
    "<ul>\
    <li><a href='/auth/github'>GitHub</a></li>\
    <li><a href='/logout'>logout</a></li>\
  </ul>";



  res.send(html);

});

app.get('/user', (req, res) => {
  var html = "Welcome User";
  if (req.isAuthenticated()) {
    html += "<p>authenticated as user:</p>"
    html += "<pre>" + JSON.stringify(req.user, null, 4) + "</pre>";
  };
  res.send(html);

});

app.get('/logout', (req, res) => {
  console.log("logging out");
  req.logout();
  res.redirect('/');

});

var server = app.listen(30000, function() {
  console.log('Example app listening at http://%s:%s',
    server.address().address, server.address().port);
});
