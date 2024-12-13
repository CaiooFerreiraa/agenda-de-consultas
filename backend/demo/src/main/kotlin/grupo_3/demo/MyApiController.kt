package grupo_3.demo

import grupo_3.demo.MainApp.Consultation
import grupo_3.demo.MainApp.Doctor
import grupo_3.demo.MainApp.ManagedConsultation
import grupo_3.demo.MainApp.ManagedDoctors
import grupo_3.demo.MainApp.RegisterPatients
import grupo_3.demo.MainApp.Patient
import grupo_3.demo.User.*
import org.springframework.web.bind.annotation.*
import java.time.LocalDateTime

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
            Doctor("Caio Ferreira Almeida", "Cardiologista", "5682", "cs1919238@gmail.com", "testando"),
            Doctor("Ana Clara Silva", "Pediatra", "1234", "anaclara@gmail.com", "p"),
            Doctor("Lucas Santos", "Dermatologista", "9876", "lucassantos@gmail.com", "o")
        )

        predefinedDoctors[0].addAvailableTime(LocalDateTime.of(2024, 12,1,8, 0));
        val test = predefinedDoctors[0].printSchedule()

        for (i in 0 until test.size()) {
            println(test.get(i))
        }

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
        val doc = Doctor(
            userData.doctor.name,
            userData.doctor.specialty,
            userData.doctor.cm,
            userData.doctor.email,
            userData.doctor.password
        );

        var pat = regPatient.getPatientByCpf(userData.patient.cpf)
        val arr = doctors.arrayDoctors();
        var doctorExistent: Doctor? = null;

        for (i in 0 until arr.size) {
            if (arr.get(i) == doc) {
                doctorExistent = arr.get(i)
            }
        }

        if (pat == null) {
            pat = Patient(
                userData.patient.name,
                userData.patient.cpf,
                userData.patient.email,
                userData.patient.age
            )

            regPatient.register(pat)
        }

        if (doctorExistent == null) {
            doctors.registerDoctor(doc);
        } else {
            consultation.scheduleAppointments(doctorExistent, pat, userData.date, userData.reason)
        }

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

    @PostMapping("/registerHour")
    fun registerHour(@RequestBody userData: Hour): Int {
        val doc = Doctor(
            userData.doctor.name,
            userData.doctor.specialty,
            userData.doctor.cm,
            userData.doctor.email,
            userData.doctor.password
        );

        val arr = doctors.arrayDoctors();
        var doctorExistent: Doctor? = null;
        var response: Int;

        for (i in 0 until arr.size) {
            if (arr.get(i) == doc) {
                doctorExistent = arr.get(i)
            }
        }

        if (doctorExistent == null) {
            doctors.registerDoctor(doc);
            response = 404;
        } else {
            if (doctorExistent.addAvailableTime(userData.date)) response = 200 else response = 404;
        }

        return response
    }

    @PostMapping("/unblockHour")
    fun unblockHour(@RequestBody userData: Hour): Int {
        val doc = Doctor(
            userData.doctor.name,
            userData.doctor.specialty,
            userData.doctor.cm,
            userData.doctor.email,
            userData.doctor.password
        );

        val arr = doctors.arrayDoctors();
        var doctorExistent: Doctor? = null;
        var response: Int;

        for (i in 0 until arr.size) {
            if (arr.get(i) == doc) {
                doctorExistent = arr.get(i)
            }
        }

        if (doctorExistent == null) {
            doctors.registerDoctor(doc);
            response = 404;
        } else {
            if (doctorExistent.hourRelease(userData.date)) response = 200 else response = 404;
        }

        return response
    }

    @PostMapping("/blockHour")
    fun blockHour(@RequestBody userData: Hour): Int {
        val doc = Doctor(
            userData.doctor.name,
            userData.doctor.specialty,
            userData.doctor.cm,
            userData.doctor.email,
            userData.doctor.password
        );

        val arr = doctors.arrayDoctors();
        var doctorExistent: Doctor? = null;
        var response: Int;

        for (i in 0 until arr.size) {
            if (arr.get(i) == doc) {
                doctorExistent = arr.get(i)
            }
        }

        if (doctorExistent == null) {
            doctors.registerDoctor(doc);
            response = 404;
        } else {
            if (doctorExistent.hourBlock(userData.date)) response = 200 else response = 404;
        }

        return response
    }

    @PostMapping("/peekHours")
    fun peekHours(@RequestBody userData: listHours): Any? {
        val doc = Doctor(
            userData.doctor.name,
            userData.doctor.specialty,
            userData.doctor.cm,
            userData.doctor.email,
            userData.doctor.password
        );

        val arr = doctors.arrayDoctors();
        var doctorExistent: Doctor? = null;

        for (i in 0 until arr.size) {
            if (arr.get(i) == doc) {
                doctorExistent = arr.get(i)
            }
        }

        val scheduled = doctorExistent?.printSchedule()
        var arrayHour: Array<LocalDateTime?>? = null

        if (scheduled != null) {
            arrayHour = arrayOfNulls(scheduled.size())

            for (i in 0 until scheduled.size()) {
                arrayHour[i] = scheduled.get(i)
            }
        }


        return arrayHour
    }

}
