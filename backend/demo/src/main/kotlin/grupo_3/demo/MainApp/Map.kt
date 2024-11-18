package grupo_3.demo.MainApp

class Map<K, V> {
    private val entries = List<Entry<K, V>>();

    data class Entry<K, V>(val key: K, var value: V);

    fun addMap(key: K, value: V) {
        for (i in 0 until entries.size()) {
            val entry = entries.get(i);

            if (entry != null && entry.key == key) {
                entry.value = value;
                return
            }
        }
        entries.addList(Entry(key, value));
    }

    fun get(key: K): V? {
        for (i in 0 until entries.size()) {
            val entry = entries.get(i);
            if (entry != null && entry.key == key) {
                return entry.value;
            }
        }

        return null;
    }

    fun remove(key: K): Boolean {
        for (i in 0 until entries.size()) {
            val entry = entries.get(i);
            if (entry != null && entry.key == key) {
                entries.remove(entry);
                return true;
            }
        }
        return false;
    }


    fun getEntries(): List<Entry<K, V>> {
        val result = List<Entry<K, V>>()
        for (i in 0 until entries.size()) {
            val entry = entries.get(i)
            if (entry != null) {
                result.addList(entry)
            }
        }
        return result
    }

    fun size(): Int {
        return entries.size()
    }
}