import { AppointmentModel } from "../models/createDoctor.js";

const index = (req, res) => {
    res.render('make-appointment');
}

const myAppointment = async (req, res) => {
    try {
        const appointments = await fetch('http://192.168.1.151:8000/api/recovery', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.session.user)
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

        const response = await fetch('http://192.168.1.151:8000/api/registerConsultation', {
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