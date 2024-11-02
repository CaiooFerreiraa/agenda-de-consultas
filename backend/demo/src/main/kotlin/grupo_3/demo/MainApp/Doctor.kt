package grupo_3.demo.MainApp

import java.time.LocalDateTime

class Doctor {
    private var name: String;
    private var specialty: String;
    private var cm : String;
    private var email: String;
    private var passLogin: String;
    private var availableTimes: List<LocalDateTime>;

    constructor(name: String, specialty: String, cm: String, email: String, passLogin: String, availableTimes: List<LocalDateTime>) {
        this.name = name;
        this.specialty = specialty;
        this.cm = cm;
        this.email = email;
        this.passLogin = passLogin;
        this.availableTimes = availableTimes;
    }
}