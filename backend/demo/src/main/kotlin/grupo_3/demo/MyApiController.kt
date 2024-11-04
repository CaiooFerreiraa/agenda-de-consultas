package grupo_3.demo

import grupo_3.demo.User.Login
import grupo_3.demo.User.User
import grupo_3.demo.User.UserLogin
import grupo_3.demo.User.UserRegister
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody

@CrossOrigin(origins = ["http://192.168.1.151:8080"]) // Permite requisições de 'http://192.168.1.151:8080' para todos os endpoints deste controller
@RestController
@RequestMapping("/api")
class MyApiController {
    val register = UserRegister(10)
    var login = UserLogin(register.getUsers(), register.getAmount());

    @PostMapping("/login")
    fun loginUser(@RequestBody userData: Login): Any? {
        login = UserLogin(register.getUsers(), register.getAmount());
        return login.userExistente(userData);
    }

    @PostMapping("/register")
    fun registerUser(@RequestBody userData: User): Any? {
        return register.addUser(userData);
    }
}
