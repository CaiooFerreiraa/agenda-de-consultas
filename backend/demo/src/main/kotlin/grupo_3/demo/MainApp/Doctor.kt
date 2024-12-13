package grupo_3.demo.MainApp

import java.time.LocalDateTime

class Doctor(val name: String, val specialty: String, val cm: String, val email: String, val password: String?) {
    val availableTimes = List<LocalDateTime>()
    val blockTimes = List<LocalDateTime>();

    fun hourBlock(dateHour: LocalDateTime): Boolean {
        if (availableTimes.contains(dateHour)) {
            blockTimes.addList(dateHour);
            return true;
        }
        return false;
    }

    fun hourRelease(dateHour: LocalDateTime): Boolean {
        return blockTimes.remove(dateHour);
    }

    fun printSchedule(): List<LocalDateTime> {
        val schedule = List<LocalDateTime>();

        for (i in 0 until availableTimes.size()) {
            val hour = availableTimes.get(i);

            if (hour != null && !blockTimes.contains(hour)) {

                schedule.addList(hour);
            }
        }

        return schedule;
    }

    fun addAvailableTime(dateHour: LocalDateTime): Boolean {
        availableTimes.addList(dateHour);
        return true;
    }

    fun addNotes(consultation: Consultation, notes: String) {
        consultation.notes += "- $notes\n"
    }

    override fun toString(): String {
        return "Medico(nome='$name', specialty='$specialty', email='$email', password='$password')"
    }

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is Doctor) return false

        return name == other.name &&
                specialty == other.specialty &&
                cm == other.cm &&
                email == other.email
    }

    override fun hashCode(): Int {
        var result = name.hashCode()
        result = 31 * result + specialty.hashCode()
        result = 31 * result + cm.hashCode()
        result = 31 * result + email.hashCode()
        return result
    }
}