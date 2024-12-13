const index = (req, res) => {
  res.render('home.ejs');
}

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
}

export default {
  index,
  logout
}