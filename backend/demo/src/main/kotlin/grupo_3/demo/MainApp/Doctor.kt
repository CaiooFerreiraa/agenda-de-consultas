package grupo_3.demo.MainApp

import java.time.LocalDateTime

class Doctor(val name: String, val specialty: String, val cm: String, val email: String) {
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
        return "Medico(nome='$name', specialty='$specialty', email='$email')"
    }
}