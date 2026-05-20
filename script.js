document.addEventListener("DOMContentLoaded", function() {
  const ALLOWED_DOMAIN = 'newtral.es';
  const WEB_URL = 'https://www.newtral.es/edificios-ciudades-catastro/20250521/';

  const ref = document.referrer;
  const isAllowed = ref && ref.includes(ALLOWED_DOMAIN);

  if (!isAllowed) {
    document.body.innerHTML = `
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        font-family: Helvetica, Arial, sans-serif;
        text-align: center;
        padding: 20px;
        background: #f5f5f5;
      ">
        <p style="font-size: 1.1rem; color: #333; margin-bottom: 20px; max-width: 400px; line-height: 1.5;">
          Esta visualización está disponible en <strong>Newtral</strong>.
        </p>
        <a href="${WEB_URL}" style="
          background: #01f3b3;
          color: #000000;
          padding: 12px 28px;
          text-decoration: none;
          font-family: Helvetica, Arial, sans-serif;
          font-size: 0.95rem;
          letter-spacing: 0.02em;
        ">
          Ver en Newtral →
        </a>
      </div>
    `;
    return;
  }

  mapboxgl.accessToken = 'pk.eyJ1IjoibmV3dHJhbCIsImEiOiJjazJrcDY4Y2gxMmg3M2JvazU4OXV6NHZqIn0.VO5GkvBq_PSJHvX7T8H9jQ';

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/newtral/cm9baj34r003g01sb7gujhjgm',
    center: [-3.7038, 40.4168],
    zoom: 5
  });

  map.on('load', function() {
    const capasPrueba = [
      { source: 'EDIFICIOS_LOTE_1', url: 'mapbox://newtral.3cxpr2ye', layer: 'EDIFICIOS_LOTE_1' },
      { source: 'EDIFICIOS_LOTE_2', url: 'mapbox://newtral.cbxyx5ak', layer: 'EDIFICIOS_LOTE_2' },
      { source: 'EDIFICIOS_LOTE_3', url: 'mapbox://newtral.cshbn7wu', layer: 'EDIFICIOS_LOTE_3' },
      { source: 'EDIFICIOS_LOTE_4', url: 'mapbox://newtral.comev5f6', layer: 'EDIFICIOS_LOTE_4' },
      { source: 'EDIFICIOS_LOTE_5', url: 'mapbox://newtral.alkdds6x', layer: 'EDIFICIOS_LOTE_5' },
      { source: 'EDIFICIOS_LOTE_6', url: 'mapbox://newtral.43lskarr', layer: 'EDIFICIOS_LOTE_6' },
      { source: 'EDIFICIOS_LOTE_7', url: 'mapbox://newtral.8tb1u2ke', layer: 'EDIFICIOS_LOTE_7' },
      { source: 'EDIFICIOS_LOTE_8', url: 'mapbox://newtral.0yxx75b1', layer: 'EDIFICIOS_LOTE_8' },
      { source: 'EDIFICIOS_LOTE_9', url: 'mapbox://newtral.avo7jnvt', layer: 'EDIFICIOS_LOTE_9' }
    ];

    capasPrueba.forEach(capa => {
      map.addSource(capa.source, {
        type: 'vector',
        url: capa.url
      });

      map.addLayer({
        id: capa.source.toLowerCase(),
        type: 'fill',
        source: capa.source,
        'source-layer': capa.layer,
        paint: {
          'fill-color': [
            "case",
              ["==", ["get", "beginning"], null],
              "#e9e9e9",
              [">=", ["get", "beginning"], 2010],
              "#01f3b3",
              [">=", ["get", "beginning"], 2000],
              "#5bffd4",
              [">=", ["get", "beginning"], 1990],
              "#808080",
              [">=", ["get", "beginning"], 1980],
              "#8a8a8a",
              [">=", ["get", "beginning"], 1970],
              "#949494",
              [">=", ["get", "beginning"], 1960],
              "#9e9e9e",
              [">=", ["get", "beginning"], 1950],
              "#a8a8a8",
              [">=", ["get", "beginning"], 1900],
              "#b2b2b2",
              [">=", ["get", "beginning"], 1850],
              "#d6d0c4",
              [">=", ["get", "beginning"], 1750],
              "#ded9c2",
              [">=", ["get", "beginning"], 1500],
              "#e6e0bb",
              [">=", ["get", "beginning"], 0],
              "#ececec",
              "#ececec"
            ],
          'fill-opacity': 1,
          'fill-outline-color': [
              "case",
              ["==", ["get", "beginning"], null],
              "#858585",
              [">=", ["get", "beginning"], 2026],
              "#013930",
              [">=", ["get", "beginning"], 2010],
              "#4c004c",
              [">=", ["get", "beginning"], 2000],
              "#016649",
              [">=", ["get", "beginning"], 1990],
              "#848484",
              [">=", ["get", "beginning"], 1980],
              "#848484",
              [">=", ["get", "beginning"], 1970],
              "#848484",
              [">=", ["get", "beginning"], 1960],
              "#848484",
              [">=", ["get", "beginning"], 1950],
              "#848484",
              [">=", ["get", "beginning"], 1900],
              "#848484",
              [">=", ["get", "beginning"], 1850],
              "#ccba66",
              [">=", ["get", "beginning"], 1750],
              "#ccac3f",
              [">=", ["get", "beginning"], 1500],
              "#cc9900",
              [">=", ["get", "beginning"], 1400],
              "#cc8800",
              [">=", ["get", "beginning"], 1300],
              "#848484",
              "#848484"
            ]          
        }
      });
    });

    // Definir los colores y rangos de años para la leyenda
    const legendItems = [
      { color: "#01f3b3", description: "2010 - presente" },
      { color: "#5bffd4", description: "2000 - 2009" },
      { color: "#808080", description: "1990 - 1999" },
      { color: "#8a8a8a", description: "1980 - 1989" },
      { color: "#949494", description: "1970 - 1979" },
      { color: "#9e9e9e", description: "1960 - 1969" },
      { color: "#a8a8a8", description: "1950 - 1959" },
      { color: "#b2b2b2", description: "1900 - 1949" },
      { color: "#d6d0c4", description: "1850 - 1899" },
      { color: "#ded9c2", description: "1750 - 1849" },
      { color: "#e6e0bb", description: "1500 - 1749" },
      { color: "#ececec", description: "Antes de 1500" },
      { color: "#e9e9e9", description: "Desconocido" }
    ];

    // Crear la leyenda
    const legendTitle = "Año de construcción";
    const legendContent = document.getElementById('legend-content');
    legendContent.innerHTML = `<h4 class="legend-title">${legendTitle}</h4>`;
    legendItems.forEach(item => {
      const legendItem = document.createElement('div');
      legendItem.className = 'legend-item';
      legendItem.innerHTML = `
        <div class="legend-color" style="background-color: ${item.color};"></div>
        <span class="legend-text">${item.description}</span>
      `;
      legendContent.appendChild(legendItem);
    });

    // Añadir funcionalidad para colapsar la leyenda en todas las pantallas
    const toggleLegendButton = document.getElementById('toggle-legend');
    if (toggleLegendButton) {
      toggleLegendButton.addEventListener('click', () => {
        const isCollapsed = legendContent.classList.toggle('collapsed');
        toggleLegendButton.textContent = isCollapsed ? 'Mostrar leyenda' : 'Ocultar leyenda';
      });
    }

    // Configurar el popup
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });

    function showPopup(feature, lngLat) {
      let construccion = feature.properties.beginning || 'Desconocido';
      const uso = feature.properties.currentUse || 'Desconocido';
      const viviendas = feature.properties.numberOfBuildingUnits || 'Sin información';
      let metros = feature.properties.value || 'No disponible';
      let ccaa = feature.properties.CCAA || 'Desconocido';

      let notaCatastro = '';
      if (construccion !== 'Desconocido' && !isNaN(construccion)) {
        const anio = parseInt(construccion);
        if (anio >= 2025 || anio <= 999) {
          construccion = `${construccion}*`;
          notaCatastro = '<div style="font-size: 12px; color: #555;">* Fecha del Catastro en duda</div>';
        }
      }

      if (metros !== 'No disponible') {
        const metrosNum = parseFloat(metros);
        if (!isNaN(metrosNum)) {
          const metrosStr = metrosNum.toString().replace(/\..*/g, '');
          if (metrosStr.length === 4) {
            metros = metrosStr.slice(0, 1) + '.' + metrosStr.slice(1);
          } else if (metrosStr.length > 4) {
            metros = metrosNum.toLocaleString('es-ES', { minimumFractionDigits: 0 });
          } else {
            metros = metrosStr;
          }
        } else {
          metros = 'No disponible';
        }
      }

      if (ccaa === 'Castilla_Leon') {
        ccaa = 'Castilla y León';
      } else if (ccaa === 'Baleares') {
        ccaa = 'Islas Baleares';
      } else if (ccaa === 'Comunidad_Valenciana') {
        ccaa = 'Comunidad Valenciana';
      }

      let popupHTML = `
        <div>
          <div><span class="popup-etiqueta">Año de construcción:</span> <span class="popup-construccion">${construccion}</span></div>
          ${notaCatastro}
          <div><span class="popup-etiqueta">Uso:</span> ${uso}</div>
          <div><span class="popup-etiqueta">Superficie:</span> ${metros} m²</div>
      `;

      if (uso === 'Residencial') {
        popupHTML += `<div><span class="popup-etiqueta">Viviendas:</span> ${viviendas}</div>`;
      }

      popupHTML += `<div><span class="popup-etiqueta">Comunidad autónoma:</span> ${ccaa}</div></div>`;

      popup.setLngLat(lngLat).setHTML(popupHTML).addTo(map);
    }

    // Añadir eventos de interacción para cada capa
    capasPrueba.forEach(capa => {
      map.on('mousemove', capa.source.toLowerCase(), function(e) {
        if (e.features && e.features.length > 0) {
          map.getCanvas().style.cursor = 'pointer';
          showPopup(e.features[0], e.lngLat);
        }
      });

      map.on('mouseleave', capa.source.toLowerCase(), function() {
        map.getCanvas().style.cursor = '';
        popup.remove();
      });
    });

    // Añadir el geocoder
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      placeholder: "   Buscar ubicación...",
      marker: false
    });
    document.getElementById("geocoder-container").appendChild(geocoder.onAdd(map));
  });
});
