package grupo_3.demo.User

class UserCadastro {
    private val users: Array<User?>;
    private var qta: Int = 0;
    private var ponteiroIncio: Int;
    private var ponteiroFim: Int;

    constructor(tam: Int = 10) {
        users = arrayOfNulls(tam)
        ponteiroFim = -1;
        ponteiroIncio = 0;
    }

    private fun userExistente(user: User): Boolean {
        var aux: Boolean = false;
        
        if (estaVazia()) return aux;

        var userArray: Array<User?> = getUsers();
        println(userArray[0]?.cpf == user.cpf);
        
        for (i in 0 until userArray.size) {
            if (userArray[i]?.cpf == user.cpf) {
                aux = true;
            }
        }

        return aux;
    }

    private fun estaCheia(): Boolean {
        return qta == users.size;
    }

    private fun estaVazia(): Boolean {
        return qta == 0;
    }

    fun getUsers(): Array<User?> {
        if (estaVazia()) return arrayOfNulls<User>(0);

        val arrayAux: Array<User?> = arrayOfNulls(qta);

        for (i in 0 until qta) {
            arrayAux[i] = users[i];
        }
        
        return arrayAux;
    }

    fun addUser(user: User) {
        if (estaCheia() || userExistente(user)) {
            println("A lista está cheia");
        } else {
            ponteiroFim = (ponteiroFim + 1) % users.size;
            users[ponteiroFim] = user;
            qta++;
        }
    }
}