export class AppointmentModel {
    static formatData(userData, appointmentData) {
        const {doctor, date, time, ...restConsult} = appointmentData
        const {password, ...restUser} = userData;

        return {
            doctor: {
                ...this.createDoctor(doctor)
            },
            patient: {
                ...restUser
            },
            status: "Agendada",
            date: date + "T" + time,
            ...restConsult
        }
    }

    static createDoctor(doctorName) {
        switch (doctorName) {
            case "felipe":
                return {
                    name: "Felipe Fernandes Araújo",
                    specialty: "Cardiologísta",
                    cm: "1254",
                    email: "felipinho@gmail.com",
                    password: "C@iosant0s"
                }
            case "caio":
                return {
                    name: "Caio Ferreira Almeida",
                    specialty: "Cardiologista",
                    cm: "5682",
                    email: "cs1919328@gamil.com",
                    password: "C@iosant0s"
                }
        }
    }
}