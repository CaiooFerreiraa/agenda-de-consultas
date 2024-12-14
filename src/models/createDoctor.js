export class AppointmentModel {
    static formatData(userData, appointmentData) {
        const { doctor, time, ...restConsult } = appointmentData;
        const { password, ...restUser } = userData;

        return {
            doctor: {
                ...this.createDoctor(doctor)
            },
            patient: {
                ...restUser
            },
            status: "Agendada",
            date: time, // Agora `time` já está no formato ISO `YYYY-MM-DDTHH:mm:ss`
            ...restConsult
        };
    }


    static createDoctor(doctorName) {
        switch (doctorName) {
            case "felipe":
                return {
                    name: "Felipe Fernandes Araujo",
                    specialty: "Pediatra",
                    cm: "1254",
                    email: "felipinho@gmail.com",
                    password: "p"
                }
            case "caio":
                return {
                    name: "Caio Ferreira Almeida",
                    specialty: "Cardiologista",
                    cm: "5682",
                    email: "cs1919238@gmail.com",
                    password: "testando"
                }
        }
    }
}