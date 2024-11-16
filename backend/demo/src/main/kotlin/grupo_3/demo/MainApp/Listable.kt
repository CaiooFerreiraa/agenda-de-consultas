package grupo_3.demo.MainApp

interface Listable<T> {
    fun add(element: T)
    fun remove(element: T): Boolean
    fun get(index: Int): T?
    fun contains(element: T): Boolean

    fun isFull(): Boolean
    fun isEmpty(): Boolean
    fun printList()
}