const index = (req, res) => {
  res.render('login.ejs')
}

const previus = (req, res) => {
  res.redirect('/');
}

export default {
  index,
  previus
}