package grupo_3.demo.MainApp

import java.time.LocalDateTime
import java.time.Duration

class ManagedConsultation {
    private val consultations = Map<Doctor, List<Consultation>>();

    fun scheduleAppointments(doctor: Doctor, patient: Patient, dateHour: LocalDateTime, reason: String): Boolean {
        if (doctor.blockTimes.contains(dateHour) || existsConsultation(doctor, dateHour)) {
            return false
        }

        val consult = Consultation(doctor, patient, dateHour, reason);

        val listConsultation = consultations.get(doctor) ?: List<Consultation>().also() { consultations.add(doctor, it)}

        listConsultation.add(consult);
        patient.addConsultation(consult);

        return true;
    }

    fun cancelAppointments(doctor: Doctor, dateHour: LocalDateTime, minAntecedent: Duration): Boolean {
        val listConsultation = consultations.get(doctor) ?: return false;

        val consultationIndex = listConsultation.searchIndex {it?.dateHour == dateHour}

        if (consultationIndex == -1) return false;

        val consultation = listConsultation.get(consultationIndex) ?: return false;
        val timeStempConsult = Duration.between(LocalDateTime.now(), dateHour)

        if (timeStempConsult < minAntecedent) return false

        consultation.status = "Cancelada";
        listConsultation.remove(consultation);
        return true;
    }

    fun consultationForSpecialty(specialty: String): List<Doctor> {
        val doctorsSpecialty = List<Doctor>();
        for (i in 0 until doctorsSpecialty.size()) {
            val doctor = doctorsSpecialty.get(i);
            if (doctor != null && doctor.specialty == specialty) {
                doctorsSpecialty.add(doctor)
            }
        }

        return doctorsSpecialty;
    }

    private fun existsConsultation(doctor: Doctor, dateHour: LocalDateTime): Boolean {
        val listConsultation = consultations.get(doctor) ?: return false;
        for (i in 0 until listConsultation.size()) {
            val consultation = listConsultation.get(i);
            if (consultation != null && consultation.dateHour == dateHour) {
                return true;
            }
        }

        return false;
    }

    fun suggestAlternativeTimes(doctor: Doctor, desiredTime: LocalDateTime): List<LocalDateTime> {
        val alternativeTimes = List<LocalDateTime>();

        val after = desiredTime.minusMinutes(30);
        val before = desiredTime.plusMinutes(30);

        if (!doctor.blockTimes.contains(after) && !existsConsultation(doctor, after)) {
            alternativeTimes.add(after);
        }

        if (!doctor.blockTimes.contains(before) && !existsConsultation(doctor, before)) {
            alternativeTimes.add(before);
        }

        return alternativeTimes;
    }
}
