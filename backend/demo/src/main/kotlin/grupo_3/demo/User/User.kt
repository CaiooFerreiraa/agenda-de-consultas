package grupo_3.demo.User

data class Login (
    val cpf: String,
    val password: String,
)

data class User (
    val username: String,
    val cpf: String,
    val email: String,
    val age: Int,
    val password: String
)