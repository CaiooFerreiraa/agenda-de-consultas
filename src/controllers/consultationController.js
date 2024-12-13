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
        }).then(response => response.json());

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

export default {
    index,
    marked,
    myAppointment
}