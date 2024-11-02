const index = (req, res) => {
  res.render('login.ejs')
}

const previus = (req, res) => {
  res.redirect('/');
}

const submit = async (req, res) => {
  const data = req.body;

  const reponse = await fetch('http://192.168.1.151:8000/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(response => response.json());

  console.log(reponse);
  res.redirect('back');
}

export default {
  index,
  previus,
  submit
}