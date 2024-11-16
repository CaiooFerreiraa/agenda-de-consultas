package grupo_3.demo.MainApp

import java.time.LocalDateTime


fun main() {
    val doctors = ManagedDoctors();
    val consultation = ManagedConsultation();

    val agr = LocalDateTime.of(2024, 10, 15, 20, 0, 0)
    val agr0 = LocalDateTime.of(2024, 10, 15, 7, 0, 0)
    val agr1 = LocalDateTime.of(2024, 10, 15, 8, 45, 0)
    val agr2 = LocalDateTime.of(2024, 10, 15, 9, 0, 0)

    val rp = RegisterPatients();
    val d1 = Doctor("João", "Cardiologista", "hduq", "joaozinh@gmail.com", "test1234");
    val d2 = Doctor("Lucas", "Cardiologista", "fgjkf", "lucaszinh@gmail.com","test211564");

    val p1 = Patient("Caio", "2165436132", "cs728136@gmail.com", 20);

    d1.addAvailableTime(agr);
    d1.addAvailableTime(agr0);

    println(d1.hourBlock(agr))
    println(consultation.suggestAlternativeTimes(d1, agr).get(0))

}