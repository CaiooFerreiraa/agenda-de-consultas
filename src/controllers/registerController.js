import {getMac} from "../../FunctionsAux/functionsAux.js";

const index = (req, res) => {
    res.render('register');
};

const register = async (req, res) => {
    try {
        const data = req.body;

        const response = await fetch(`http://${getMac()}:8000/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json());

        if (response) {
            const dataLogin = {
                identifier: data.cpf,
                password: data.password
            }

            const login = await fetch(`http://${getMac()}:8000/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataLogin)
            }).then(response => response.json());

            if (login[0] !== 200) {
                req.flash('error', 'Houve algum erro no login')
                return req.session.save(() => {
                    res.redirect(req.get('Referrer'));
                })
            }

            req.session.user = login[1];
            return req.session.save(() => {
                res.redirect('/');
            })
        }
    } catch (error) {
        console.error(error)
    }
}

export default {
    index,
    register
}