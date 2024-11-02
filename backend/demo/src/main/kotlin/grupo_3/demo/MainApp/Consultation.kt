package grupo_3.demo.MainApp

import java.time.LocalDateTime

class Consultation {
    private val doctor: Doctor;
    private val patient: Patient;
    private var dateHour: LocalDateTime;
    private var reason: String;
    private var notes: String;
    private var status: String;

    constructor(doctor: Doctor, patient: Patient, dateHour: LocalDateTime, reason: String, notes: String, status: String) {
        this.doctor = doctor;
        this.patient = patient;
        this.dateHour = dateHour;
        this.reason = reason;
        this.notes = notes;
        this.status = status;
    }
}