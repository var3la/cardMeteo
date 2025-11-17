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
      mapas.forEach(mapa => {
        cont.innerHTML += `<img class="map" src="${data.urlBase}${mapa.urlMapa}" alt="">`;
      });
      // mapa.src = `${data.urlBase}${data.listaPredicions[0].listaMapas[0].urlMapa}`;
      
      // Opcional: muestra datos en la tarjeta
      document.querySelector('.card-header span:first-child').textContent = data.listaPredicions[0].titulo;
      document.querySelector('.card-header span:last-child').textContent = data.listaPredicions[0].comentario;
      
    } catch (error) {
      console.error('Error fetching weather data:', error);
      document.querySelector('.card-header span:last-child').textContent = 'Error cargando datos';
    }
  }
  
  fetchWeather();