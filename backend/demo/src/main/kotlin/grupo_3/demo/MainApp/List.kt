package grupo_3.demo.MainApp

class List<T>: Listable<T> {
    private var elements: Array<Any?> = arrayOfNulls(20);
    private var pointerEnd = -1;

    override fun isFull(): Boolean {
        return pointerEnd == elements.size - 1;
    }

    override fun isEmpty(): Boolean {
        return pointerEnd == -1;
    }

    private fun resizeArray() {
        var newElements: Array<Any?> = arrayOfNulls(elements.size*2);

        for (i in 0 .. pointerEnd) {
            newElements[i] = elements[i];
        }

        elements = newElements;
    }

    override fun add(element: T) {
        if (isFull()) resizeArray();
        pointerEnd++;
        elements[pointerEnd] = element;
    }

    override fun remove(element: T): Boolean {
        for (i in 0..pointerEnd) {
            if (elements[i] == element) {
                for (j in i until pointerEnd) {
                    elements[j] = elements[j + 1];
                }
            }
            pointerEnd--;
            return true
        }
        return false;
    }

    fun searchIndex(condition: (T?) -> Boolean): Int {
        for (i in 0..pointerEnd) {
            if (condition(elements[i] as T?)) return i
        }
        return -1;
    }

    override fun get(index: Int): T? {
        var retur: T? = null;

        if (!isEmpty() && index >= 0 && index <= pointerEnd) {
            retur = elements[index] as T?;
        }

        return retur;
    }

    override fun contains(element: T): Boolean {
        return elements.contains(element);
    }

    override fun printList() {
        if (!isEmpty()) {
            print("Lista está vazia!!");
        } else {
            for (i in 0..pointerEnd) {
                print("${elements[i]}\n");
            }
        }
    }

    fun size(): Int {
        return pointerEnd + 1;
    }
}