const index = (req, res) => {
    res.render('register');
};

const register = async (req, res) => {
    const data = req.body;
    console.log(data);

    try {
        const response = await fetch('http://192.168.1.151:8000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json()).then(data => data);

        console.log(response)
        res.send(response)

    } catch (e) {
        console.error(e);
    }
}

export default {
    index,
    register
}