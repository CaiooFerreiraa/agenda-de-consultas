import createDoctor from "../models/createDoctor.js";
import {xContentTypeOptions} from "helmet";

const index = (req, res) => {
    res.render('make-appointment');
}

const myAppointment = async (req, res) => {
    try {
        const {username, ...rest} = req.session.user;

        const data = {
            name: username,
            ...rest
        }

        const response = await fetch('http://192.168.1.151:8000/api/recovery', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response);

        console.log(response);
        return req.session.save(
            res.render('/myAppointment')
        )
    } catch (e) {
      console.error(e)
      res.redirect('error')
    }
}

const marked = async (req, res) => {
    try {
        const {doctor, date, time, ...restConsult} = req.body
        const {password, username, ...restUser} = req.session.user;

        const data = {
            doctor: {
                ...createDoctor.doctor(doctor)
            },
            patient: {
                name: username,
                ...restUser
            },
            status: "Agendada",
            date: date + "T" + time,
            ...restConsult
        }

        console.log(data)

        const response = await fetch('http://192.168.1.151:8000/api/registerConsultation', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(response => response);

        console.log(response)

        return req.session.save(
            res.redirect(req.get("Referrer"))
        );
    }catch (e) {
        console.error(e)
        res.redirect('/error')
    }
}

export default {
    index,
    marked,
    myAppointment
}