package grupo_3.demo.MainApp

class Patient {
    private var name: String;
    private var cpf: String;
    private var email: String;
    private var age: Int;
    private var passLogin: String;

    constructor(name: String, cpf: String, email: String, age: Int, passLogin: String) {
        this.name = name;
        this.cpf = cpf;
        this.email = email;
        this.age = age;
        this.passLogin = passLogin;
    }

    fun imprimir() {
        println(name);
        println(cpf);
        println(email);
        println(age);
        println(passLogin);
//        println(history);
    }
}