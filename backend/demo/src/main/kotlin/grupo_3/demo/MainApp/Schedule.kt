package grupo_3.demo.MainApp

class Schedule {
    private val doctor: Doctor;
//    private val consultations: HashMap<Doctor, List<Consultation>>;

    constructor(doctor: Doctor, consultations: List<Consultation>) {
        this.doctor = doctor;
    }
}