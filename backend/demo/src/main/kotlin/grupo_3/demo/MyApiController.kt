package grupo_3.demo

import grupo_3.demo.User.UserCadastro
import grupo_3.demo.User.User
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody

@CrossOrigin(origins = ["http://192.168.1.151:8080"]) // Permite requisições de 'http://192.168.1.151:8080' para todos os endpoints deste controller
@RestController
@RequestMapping("/api")
class MyApiController {
    val cadastro = UserCadastro(10);

    @PostMapping("/login")
    fun createUser(@RequestBody userData: User): Array<User?> {
        cadastro.addUser(userData);

        return cadastro.getUsers();
    }
}
