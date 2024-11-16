package grupo_3.demo.MainApp

class RegisterPatients {
    private val patients = List<Patient>();

    fun register(patient: Patient): Boolean {
        patients.add(patient);
        return true;
    }

    fun removePatient(patient: Patient): Boolean {
        return patients.remove(patient);
    }

    fun printPatient() {
        for (i in 0 until patients.size()) {
            val patient = patients.get(i);
            if ( patient != null ) {
                print(patient);
            }
        }
    }
}