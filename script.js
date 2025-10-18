// Maneja la generación del TXT cuando se envía el formulario.
document.getElementById('csvForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const fileInput = document.getElementById('csvFile');
    const levelSelect = document.getElementById('levelSelect');
    const selectedLevel = levelSelect.value;
    const downloadLink = document.getElementById('downloadLink');

    // Limpia el enlace previo antes de procesar un nuevo archivo.
    downloadLink.classList.remove('visible');
    downloadLink.removeAttribute('href');
    downloadLink.removeAttribute('download');

    if (!fileInput.files.length || !selectedLevel) {
        alert('Por favor, sube un archivo y selecciona un nivel.');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
        const csvData = event.target.result;
        const rows = csvData.split('\n').map(row => row.split(','));
        const headers = rows[0];
        const levelIndex = headers.indexOf("Nivel actual");
        const memberIndex = headers.indexOf("Miembro");

        if (levelIndex === -1 || memberIndex === -1) {
            alert('El archivo CSV no tiene las columnas esperadas.');
            return;
        }

        // Filtra miembros según el nivel seleccionado.
        const filteredMembers = rows
            .slice(1) // Exclude headers
            .filter(row => row[levelIndex]?.trim() === selectedLevel)
            .map(row => row[memberIndex]?.trim());

        if (filteredMembers.length === 0) {
            alert('No se encontraron usuarios para este nivel.');
            return;
        }

        const txtContent = filteredMembers.join('\n');
        const blob = new Blob([txtContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        // Configura el enlace de descarga con el contenido generado.
        downloadLink.href = url;
        downloadLink.download = `${selectedLevel}_usuarios.txt`;
        downloadLink.textContent = `⬇️ Descargar ${filteredMembers.length} miembros de ${selectedLevel}`;
        downloadLink.classList.add('visible');
    };

    reader.readAsText(file);
});

// Se activa al seleccionar un CSV para poblar el desplegable de niveles.
document.getElementById('csvFile').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    const downloadLink = document.getElementById('downloadLink');

    // Oculta el enlace si se elige un nuevo archivo.
    downloadLink.classList.remove('visible');
    downloadLink.removeAttribute('href');
    downloadLink.removeAttribute('download');

    reader.onload = function (event) {
        const csvData = event.target.result;
        const rows = csvData.split('\n').map(row => row.split(','));
        const headers = rows[0];
        const levelIndex = headers.indexOf("Nivel actual");

        if (levelIndex === -1) {
            alert('El archivo CSV no tiene una columna "Nivel actual".');
            return;
        }

        // Extrae niveles únicos y actualiza el <select>.
        const levels = Array.from(
            new Set(rows.slice(1).map(row => row[levelIndex]?.trim()).filter(Boolean))
        );

        const levelSelect = document.getElementById('levelSelect');
        levelSelect.innerHTML = '<option value="" disabled selected>Selecciona un nivel</option>';

        levels.forEach(level => {
            const option = document.createElement('option');
            option.value = level;
            option.textContent = level;
            levelSelect.appendChild(option);
        });
    };

    reader.readAsText(file);
});
