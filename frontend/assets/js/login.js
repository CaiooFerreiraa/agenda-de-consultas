const form_login = document.querySelector('#login-form');
const buttonLogin = form_login.querySelector('#next');

buttonLogin.addEventListener('click', (e) => {
    e.preventDefault();
    
    const cpf = document.getElementById('cpf');
    const password = document.getElementById('password');

    const obj = {
        cpf: cpf.value,
        password: password.value,
    }

    fetch('http://192.168.1.151:8000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
    }).then(response => response.json())
        .then(data => {
        console.log(data);
    });
})