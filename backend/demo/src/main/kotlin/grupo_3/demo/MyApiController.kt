package grupo_3.demo

import grupo_3.demo.MainApp.Consultation
import grupo_3.demo.MainApp.Doctor
import grupo_3.demo.MainApp.ManagedConsultation
import grupo_3.demo.MainApp.ManagedDoctors
import grupo_3.demo.MainApp.RegisterPatients
import grupo_3.demo.MainApp.Patient
import grupo_3.demo.User.Login
import grupo_3.demo.User.User
import grupo_3.demo.User.UserLogin
import grupo_3.demo.User.UserRegister
import grupo_3.demo.User.dPatient
import grupo_3.demo.User.dataConsultation
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = ["http://192.168.1.151:8080"]) // Permite requisições de 'http://192.168.1.151:8080'
class MyApiController(private val userRegister: UserRegister = UserRegister(10)) {

    val consultation = ManagedConsultation();
    val doctors = ManagedDoctors();
    val regPatient = RegisterPatients();

    val felipe = Doctor("Felipe Araújo Matos", "Cardiologista", "5682", "cs1919328@gamil.com");

    private val userLogin: UserLogin
        get() = UserLogin(userRegister.getUsers(), userRegister.getAmount())

    @PostMapping("/login")
    fun loginUser(@RequestBody userData: Login): Any? {
        doctors.registerDoctor(felipe);
        return userLogin.userExistente(userData)
    }

    @PostMapping("/register")
    fun registerUser(@RequestBody userData: User): Any? {
        return userRegister.addUser(userData)
    }

    @PostMapping("/registerConsultation")
    fun registerConsultation(@RequestBody userData: dataConsultation): Any? {
        val doc = Doctor(userData.doctor.name, userData.doctor.specialty, userData.doctor.cm, userData.doctor.email)
        var pat = regPatient.getPatientByCpf(userData.patient.cpf)

        if (pat == null) {
            pat = Patient(userData.patient.name, userData.patient.cpf, userData.patient.email, userData.patient.age)
            regPatient.register(pat)
        }

        doctors.registerDoctor(doc)
        consultation.scheduleAppointments(doc, pat, userData.date, userData.reason)
        return "Consulta registrada com sucesso"
    }

    @PostMapping("/recovery")
    fun recovery(@RequestBody userData: dPatient): Any? {
        // Busca o paciente pelo CPF
        val pat = regPatient.getPatientByCpf(userData.cpf)

        return if (pat != null) {
            // Retorna o histórico de consultas do paciente
           pat.getHistoryConsultations();
        } else {
            // Retorna uma mensagem de erro caso o paciente não seja encontrado
            "Paciente com CPF ${userData.cpf} não encontrado."
        }
    }

}
