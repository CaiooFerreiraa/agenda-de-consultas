package grupo_3.demo.MainApp

import java.time.LocalDateTime

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
}