package grupo_3.demo.User

class UserRegister {
    private val users: Array<User?>;
    private var amount: Int = 0;
    private var pointerInit: Int;
    private var pointerEnd: Int;

    private val success: Int = 200;
    private val notFound: Int = 404;
    private val restrict: Int = 500;

    private var data: Int = 0;

    constructor(tam: Int = 10) {
        users = arrayOfNulls(tam)
        pointerEnd = -1;
        pointerInit = 0;
    }

    private fun userExistente(user: User): Boolean {
        var aux: Boolean = false;

        if (estaVazia()) return aux;

        var userArray: Array<User?> = getUsers();

        for (i in 0 until userArray.size) {
            if (userArray[i]?.cpf == user.cpf) {
                print(userArray[i]);
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

    fun getAmount(): Int {
        return amount;
    }

    fun addUser(user: User): Int {
        if (estaCheia() || userExistente(user)) {
            println("A lista está cheia");
            data = notFound;
        } else {
            pointerEnd = (pointerEnd + 1) % users.size;
            users[pointerEnd] = user;
            amount++;
            data = success;
        }
        return data;
    }

}