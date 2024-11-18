package grupo_3.demo.MainApp

import java.time.LocalDateTime

data class appointmentData(
    val doctorName: String,
    val doctorSpecialty: String,
    val doctorCm: String,
    val doctorEmail: String,

    val patientName: String,
    val patientCpf: String,
    val patientEmail: String,
    val patientAge: Int,

    val reason: String,
    val notes: String,
    val status: String
)

class Consultation(
    val doctor: Doctor,
    internal val patient: Patient,
    internal var dateHour: LocalDateTime,
    var reason: String,
    var notes: String = "",
    var status: String = "Agendada"
) {
    fun printConsultation(): String {
        return """
            Detalhes da Consulta:
            Paciente: ${patient.name}
            Especialidade: ${doctor.specialty}
            Médico: ${doctor.name}
            Dia e Horário: $dateHour
            Motivo: $reason
            Status: $status
            Notas: $notes
        """.trimIndent()
    }

    fun getAppointment(): appointmentData {
        return appointmentData(
            doctorName = doctor.name,
            doctorSpecialty = doctor.specialty,
            doctorCm = doctor.cm,
            doctorEmail = doctor.email,

            patientName = patient.name,
            patientCpf = patient.cpf,
            patientEmail = patient.email,
            patientAge = patient.age,

            reason = reason,
            notes = notes,
            status = status
        )
    }
}