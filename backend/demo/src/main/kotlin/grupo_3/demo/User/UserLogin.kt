package grupo_3.demo.User

class UserLogin {
    private val users: Array<User?>;
    private var amount: Int;
    private var pointerInit: Int;
    private var pointerEnd: Int;

    private val success: Int = 200;
    private val notFound: Int = 404;
    private val restrict: Int = 500;

    private val data: Array<Any?> = arrayOfNulls(2);

    constructor(arrayUsers: Array<User?>, amount: Int) {
        users = arrayUsers
        this.amount = amount;
        pointerEnd = -1;
        pointerInit = 0;
    }

    fun userExistente(user: User): Any? {
        if (estaVazia()) {
            data[0] = notFound;
            data[1] = null;
            return data;
        }

        var userArray: Array<User?> = getUsers();
        
        for (i in 0 until userArray.size) {
            if (userArray[i]?.cpf == user.cpf) {
                data[0] = success;
                data[1] = userArray[i];
                return data           }
        }

        data[0] = notFound;
        data[1] = null;

        return data
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
}