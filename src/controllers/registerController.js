const index = (req, res) => {
    res.render('register');
};

const register = async (req, res) => {
    const data = req.body;

    try {
        const response = await fetch('http://192.168.1.151:8000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json());

        if (response) {
            req.flash('success', "Cadastro realizado com sucesso");
            return req.session.save(
                res.redirect('back')
            );
        }

    } catch (error) {
        console.error(error)
    }
}

export default {
    index,
    register
}