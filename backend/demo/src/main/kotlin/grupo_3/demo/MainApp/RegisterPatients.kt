package grupo_3.demo.MainApp

class RegisterPatients : Listable<Patient> {
    private val patients: Array<Patient?>;
    private var pointerInit: Int;
    private var pointerEnd: Int;
    private var amount: Int;

    constructor(tam: Int = 10) {
        patients = arrayOfNulls(tam);
        pointerInit = 0;
        pointerEnd = -1;
        amount = 0;
    }

    override fun isFull(): Boolean {
        return amount == patients.size;
    }

    override fun isEmpty(): Boolean {
        return  amount == 0;
    }

    override fun registerPatient(patient: Patient) {
        TODO("Not yet implemented")
    }

    override fun removePatient(patient: Patient) {
        TODO("Not yet implemented")
    }

    override fun printPatient(): String {
        TODO("Not yet implemented")
    }
}