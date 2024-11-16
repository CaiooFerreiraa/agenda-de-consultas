package grupo_3.demo.MainApp

class RegisterPatients {
    private val patients = Map<String, Patient>()

    fun register(patient: Patient): Boolean {
        if (patients.get(patient.cpf) != null) {
            return false // Paciente já registrado
        }
        patients.add(patient.cpf, patient)
        return true
    }

    fun getPatientByCpf(cpf: String): Patient? {
        return patients.get(cpf)
    }

    fun printPatients() {
        val patientEntries = patients.getEntries() // Obtém todas as entradas do mapa
        for (i in 0 until patientEntries.size()) {
            val entry = patientEntries.get(i) // Obtém cada entrada individualmente
            if (entry != null) {
                val patient = entry.value
                println("CPF: ${entry.key} - Paciente: $patient")
            }
        }
    }

}
