package grupo_3.demo

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.CrossOrigin

@CrossOrigin(origins = ["http://localhost:8080"]) // Permite requisições de 'http://localhost:3000' para todos os endpoints deste controller
@RestController
@RequestMapping("/api")
class MyApiController {

    @GetMapping("/hello")
    fun helloWorld(): String {
        return "Hello, test!"
    }

    @GetMapping("/another-endpoint")
    fun anotherEndpoint(): String {
        return "Another endpoint response"
    }
}
