package grupo_3.demo.MainApp

class Patient(val name: String, val cpf: String, val email: String, val age: Int) {
    private val historyConsultations = List<Consultation>();

    fun addConsultation(consultation: Consultation) {
        historyConsultations.add(consultation);
    }

    fun printHistoryConsultations(): String {
        var result = "Histórico de Consultas $name\n";

        for (i in 0 until historyConsultations.size()) {
            val consultation = historyConsultations.get(i);
            if (consultation != null) {
                result += "- ${consultation.printConsultation()}\n"
            }
        }

        return result
    }

    override fun toString(): String {
        return "Patient(nome='$name', email='$email', idade=$age)"
    }
}