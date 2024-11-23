package grupo_3.demo.MainApp

class Patient(val name: String, val cpf: String, val email: String, val age: Int) {
    private val historyConsultations = List<Consultation>();

    fun addConsultation(consultation: Consultation) {
        historyConsultations.addList(consultation);
    }

    fun getHistoryConsultations(): Array<Any?> {
        var history: Array<Any?> = arrayOfNulls(historyConsultations.size());

        for (i in 0 until historyConsultations.size()) {
            val consultation = historyConsultations.get(i);
            if (consultation != null) {
                history[i] = consultation.getAppointment();
            }
        }

        return history
    }

    override fun toString(): String {
        return "Patient(nome='$name', email='$email', idade=$age)"
    }
}