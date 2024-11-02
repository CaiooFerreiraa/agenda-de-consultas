package grupo_3.demo.User

class UserCadastro {
    private val users: Array<User?>;
    private var amount: Int = 0;
    private var pointerInit: Int;
    private var poniterEnd: Int;

    constructor(tam: Int = 10) {
        users = arrayOfNulls(tam)
        poniterEnd = -1;
        pointerInit = 0;
    }

    private fun userExistente(user: User): Boolean {
        var aux: Boolean = false;
        
        if (estaVazia()) return aux;

        var userArray: Array<User?> = getUsers();
        
        for (i in 0 until userArray.size) {
            if (userArray[i]?.cpf == user.cpf) {
                aux = true;
            }
        }

        return aux;
    }

    private fun estaCheia(): Boolean {
        return amount == users.size;
    }

    private fun estaVazia(): Boolean {
        return amount == 0;
    }

    fun getUsers(): Array<User?> {
        if (estaVazia()) return arrayOfNulls<User>(0);

        val arrayAux: Array<User?> = arrayOfNulls(amount);

        for (i in 0 until amount) {
            arrayAux[i] = users[i];
        }
        
        return arrayAux;
    }

    fun addUser(user: User) {
        if (estaCheia() || userExistente(user)) {
            println("A lista está cheia");
        } else {
            poniterEnd = (poniterEnd + 1) % users.size;
            users[poniterEnd] = user;
            amount++;
        }
    }
}