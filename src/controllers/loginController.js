const index = (req, res) => {
  res.render('login.ejs')
}

const previus = (req, res) => {
  res.redirect('/');
}

const submit = async (req, res) => {
  const data = req.body;
  //const csrfToken = res.locals.csrfToken;

  try {
    const response = await fetch('http://192.168.1.151:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'x-csrf-token': csrfToken
      },
      body: JSON.stringify(data)
    }).then(response => response.json());

    console.log(response)

    if (response[0] !== 200) {
      req.flash('error', 'Houve algum erro no login')
      return req.session.save(() => {
        res.redirect(req.get('Referrer'));
      })
    }

    req.session.user = response[1];
    req.flash('success', 'Login feito com sucesso');
    return req.session.save(() => {
      res.redirect(req.get('Referrer'));
    })
  } catch (e) {
    console.error(e);
    res.redirect('error');
  }
}

export default {
  index,
  previus,
  submit
}