async function fetchWeather() {
  try {
    // Usa la ruta del proxy en lugar de la URL directa
    const response = await fetch('/api/mgrss/predicion/jsonCPrazo.action?dia=0&request_locale=gl');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    // El urlBase también pasa por el proxy
    const cont = document.querySelector('.container');
    const mapas = data.listaPredicions[0].listaMapas;
    const fecha = data.listaPredicions[0].titulo; // Obtener la fecha del título
    mapas.forEach((mapa, index) => {
      const img = document.createElement('img');
      img.className = 'map';
      img.src = `${data.urlBase}${mapa.urlMapa}`;
      img.alt = 'Mapa meteorológico';
      img.addEventListener('click', () => openModal(img.src, index, fecha));
      cont.appendChild(img);
    });

    // Opcional: muestra datos en la tarjeta
    document.querySelector('.card-header span:first-child').textContent = data.listaPredicions[0].titulo;
    document.querySelector('.card-header span:last-child').textContent = data.listaPredicions[0].comentario;

  } catch (error) {
    console.error('Error fetching weather data:', error);
    document.querySelector('.card-header span:last-child').textContent = 'Error cargando datos';
  }
}

// Función para abrir el modal
function openModal(imageSrc, index, fecha) {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');

  // Definir los períodos del día
  const periodos = ['Mañan', 'Tarde', 'Noite'];
  const periodo = periodos[index] || `Imaxe ${index + 1}`;

  modal.style.display = 'flex';
  modalImg.src = imageSrc;
  modalTitle.textContent = `${periodo} - ${fecha}`;
  setTimeout(() => modal.classList.add('active'), 10);
}

// Función para cerrar el modal
function closeModal() {
  const modal = document.getElementById('imageModal');
  modal.classList.remove('active');
  setTimeout(() => modal.style.display = 'none', 300);
}

// Event listeners para cerrar el modal
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('imageModal');
  const closeBtn = document.querySelector('.close-modal');

  // Cerrar con el botón X
  closeBtn.addEventListener('click', closeModal);

  // Cerrar al hacer click en el fondo
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Cerrar con la tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  fetchWeather();
});