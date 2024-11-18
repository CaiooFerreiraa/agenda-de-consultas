package grupo_3.demo.User

import grupo_3.demo.MainApp.Doctor
import grupo_3.demo.MainApp.Patient
import java.time.LocalDateTime

data class Login (
    val cpf: String,
    val password: String,
)

data class User (
    val name: String,
    val cpf: String,
    val email: String,
    val age: Int,
    val password: String
)

data class dDoctor(
    val name: String,
    val speciality: String,
    val cm : String,
    val email: String,
)

data class dPatient(
    val name: String,
    val cpf: String,
    val email: String,
    val age: Int,
)

data class dataConsultation(
    val doctor: Doctor,
    val patient: Patient,
    val date: LocalDateTime,
    val reason: String,
    var status: String,
    var notes: String
)