const selectDoctor = document.getElementById('doctor');
const timeSlotsSelect = document.getElementById('timeSlots');

// Atualizar horários quando o médico mudar
selectDoctor.addEventListener('change', async () => {
    timeSlotsSelect.innerHTML = '<option value="" selected>Escolha o horário</option>';

    const data = { nameDoctor: selectDoctor.value };

    try {
        const response = await fetch('/peek', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const timeSlots = await response.json();

        if (Array.isArray(timeSlots)) {
            timeSlots.forEach(slot => {
                const option = document.createElement('option');
                option.value = slot; // O backend deve fornecer o valor no formato `YYYY-MM-DDTHH:mm:ss`
                option.textContent = new Date(slot).toLocaleString(); // Formato legível para o usuário
                timeSlotsSelect.appendChild(option);
            });
        } else {
            console.error('Horários inválidos:', timeSlots);
        }
    } catch (error) {
        console.error('Erro ao buscar horários:', error);
    }
});
