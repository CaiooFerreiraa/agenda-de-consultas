import { AppointmentModel } from "../models/createDoctor.js";
import {getMac} from "../../FunctionsAux/functionsAux.js";

const index = (req, res) => {
    res.render('make-appointment');
}

const myAppointment = async (req, res) => {
    try {
        const {password, ...data} = req.session.user

        const appointments = await fetch(`http://${getMac()}:8000/api/recovery`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())

        console.log(appointments);

        return req.session.save(
            res.render('myAppointment', { appointments })
        )
    } catch (e) {
      console.error(e)
      res.render('error')
    }
}

const marked = async (req, res) => {
    try {
        const data = AppointmentModel.formatData(req.session.user, req.body);

        //                                           http://192.168.0.100:8000
        const response = await fetch(`http://${getMac()}:8000/api/registerConsultation`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(response => response);

        return req.session.save(
            res.redirect(req.get("Referrer"))
        );
    }catch (e) {
        console.error(e)
        res.redirect('/error')
    }
}

const peekHoursTheDoctor = async (req, res) => {
    try {
        const nameDoctor = req.body.nameDoctor;

        const doc = AppointmentModel.createDoctor(nameDoctor);

        const data = {
            doctor: {
                ...doc
            }
        }

        console.log(data.doctor);

        const response = await fetch(`http://${getMac()}:8000/api/peekHours`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(resp => resp.json()).then(data => data);

        res.send(response)
    } catch (e) {
        console.error(e)
    }
}

export default {
    index,
    marked,
    myAppointment,
    peekHoursTheDoctor
}