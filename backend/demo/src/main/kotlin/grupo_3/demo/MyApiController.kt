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
@CrossOrigin(origins = ["http://192.168.1.151:8080", "http://192.168.1.153:8080"]) // Permite requisições de 'http://192.168.1.151:8080'
class MyApiController(private val userRegister: UserRegister = UserRegister(10)) {

    val consultation = ManagedConsultation();
    val doctors = ManagedDoctors();
    val regPatient = RegisterPatients();

    init {
        // Lista de médicos pré-cadastrados
        val predefinedDoctors = arrayOf(
            Doctor("Caio Ferreira Almeida", "Cardiologista", "5682", "cs1919328@gamil.com", "C@iosant0s"),
            Doctor("Ana Clara Silva", "Pediatra", "1234", "anaclara@gmail.com", "p"),
            Doctor("Lucas Santos", "Dermatologista", "9876", "lucassantos@gmail.com", "o")
        )

        // Cadastra os médicos
        for (i in 0 until predefinedDoctors.size) {
            doctors.registerDoctor(predefinedDoctors[i]);
        }
    }

    private val userLogin: UserLogin
        get() = UserLogin(userRegister.getUsers(), userRegister.getAmount())

    @PostMapping("/login")
    fun loginUser(@RequestBody userData: Login): Any? {
        val ifDoctor = doctors.isDoctor(userData.identifier, userData.password);

        return if ( ifDoctor != false) {
            ifDoctor;
        } else {
            userLogin.userExistente(userData);
        }

    }

    @PostMapping("/register")
    fun registerUser(@RequestBody userData: User): Any? {
        return userRegister.addUser(userData)
    }

    @PostMapping("/registerConsultation")
    fun registerConsultation(@RequestBody userData: dataConsultation): Any? {
        val doc = Doctor(userData.doctor.name, userData.doctor.specialty, userData.doctor.cm, userData.doctor.email, null)
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
