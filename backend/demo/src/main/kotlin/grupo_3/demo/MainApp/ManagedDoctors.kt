package grupo_3.demo.MainApp

import javax.print.Doc

class ManagedDoctors {
    private val consultations = Map<Doctor, List<Consultation>>();
    private val doctorsRegister = List<Doctor>();

    fun registerDoctor(doctor: Doctor) {
        doctorsRegister.addList(doctor);
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

    fun isDoctor(identifier: String, password: String): Any? {
        for (i in 0 until doctorsRegister.size()) {
            val doctor = doctorsRegister.get(i);

            if (doctor?.email == identifier && doctor.password == password) {
                return arrayOf(200, doctor)
            };
        }
        return false;
    }

    fun size(): Int {
        return doctorsRegister.size()
    }

    fun arrayDoctors(): Array<Doctor?> {
        val arr: Array<Doctor?> = arrayOfNulls(doctorsRegister.size());

        for (i in 0 until doctorsRegister.size()) {
            arr[i] = doctorsRegister.get(i);
        }

        return arr
    }

}