package grupo_3.demo.MainApp

interface Listable<T> {
    fun registerPatient(paciente: T)
    fun removePatient(paciente: T)

    fun isFull(): Boolean
    fun isEmpty(): Boolean
    fun printPatient(): String
}