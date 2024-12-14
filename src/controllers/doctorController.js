import {getMac} from "../../FunctionsAux/functionsAux.js";

const index = (req, res) => {
    res.render('users/doctor');
}

const indexRegisterHour = (req, res) => {
    res.render('users/doctorRegisterHour')
}

const indexUnblockHour = (req, res) => {
    res.render('users/doctorUnblockHour')
}

const indexBlockHour = async (req, res) => {
    const data = {
        doctor: {
            ...req.session.user
        }
    }

    const rep = await fetch(`http://${getMac()}:8000/api/peekHours`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json()).then(data => data)

    res.render('users/doctorBlockHour', {arrayHours: rep})
}

const registerHour = async (req, res) => {
    const { 'date-available': date, 'time-available': time} = req.body

    const data = {
        doctor: {
            ...req.session.user
        }
    }

    const response = await fetch(`http://${getMac()}:8000/api/registerHour`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.status)

    if (!response && response.status !== 200) {
        req.flash('error', "Não foi possível registar o horário")

        return req.session.save(() => {
            res.redirect(req.get('Referrer'));
        })
    }

    req.flash('success', 'Horario adicionando com sucesso!')

    return req.session.save(() => {
        res.redirect(req.get('Referrer'));
    })
}

const unblockHour = async (req, res) => {
    const { 'date-available': date, 'time-available': time} = req.body

    const data = {
        doctor: {
            ...req.session.user
        },
        date: date + 'T' + time
    }

    const response = await fetch(`http://${getMac()}:8000/api/unblockHour`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => console.log(res.status))

    res.send("Está ok");
}

const blockHour = async (req, res) => {
    const { 'date-available': date, 'time-available': time} = req.body

    const data = {
        doctor: {
            ...req.session.user
        },
        date: date + 'T' + time
    }

    const response = await fetch(`http://${getMac()}:8000/api/blockHour`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => console.log(res.status))

    const rep = await fetch(`http://${getMac()}:8000/api/peekHours`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json()).then(data => console.log(data))

    res.send("Está ok");
}

export default {
    index,
    indexRegisterHour,
    indexUnblockHour,
    indexBlockHour,
    registerHour,
    unblockHour,
    blockHour
}