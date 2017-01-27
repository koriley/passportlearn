module.exports = function(app, passport) {
  app.get('/', (req, res) => {
    res.redirect('/views');
  });

  app.get('/views', (req, res) => {
    res.render('login.ejs');
  });
}
