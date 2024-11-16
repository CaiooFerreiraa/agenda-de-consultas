package grupo_3.demo

import grupo_3.demo.User.Login
import grupo_3.demo.User.User
import grupo_3.demo.User.UserLogin
import grupo_3.demo.User.UserRegister
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = ["http://192.168.1.151:8080"]) // Permite requisições de 'http://192.168.1.151:8080'
class MyApiController(
    private val userRegister: UserRegister = UserRegister(10) // Dependência inicializada
) {

    private val userLogin: UserLogin
        get() = UserLogin(userRegister.getUsers(), userRegister.getAmount())

    @PostMapping("/login")
    fun loginUser(@RequestBody userData: Login): Any? {
        return userLogin.userExistente(userData)
    }

    @PostMapping("/register")
    fun registerUser(@RequestBody userData: User): Any? {
        return userRegister.addUser(userData)
    }
}
