package grupo_3.demo.MainApp

class ManagedDoctors {
    private val consultations = Map<Doctor, List<Consultation>>();
    private val doctorsRegister = List<Doctor>();

    fun registerDoctor(doctor: Doctor) {
        doctorsRegister.add(doctor);
    }

    fun listConsultationsDoctor(doctor: Doctor) {
        val consultationTheDoctor = consultations.get(doctor);

        if (consultationTheDoctor != null && consultationTheDoctor.size() > 0) {
            for (i in 0 until consultationTheDoctor.size()) {
                val consultation = consultationTheDoctor.get(i);
                if (consultation != null) {
                    println("Consulta com o paciente: ${consultation.patient.name} em ${consultation.dateHour}")
                }
            }
        }
    }

}