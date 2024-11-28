import { onMounted, onUnmounted, ref, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export const useMapControl = (mapData) => {
  const mapRef = ref(null)
  let map = null
  let markers = []
  let layerControl = null
  const isLayerControlVisible = ref(false)

  const initializeMap = () => {
    if (!mapRef.value) return

    if (map) {
      map.remove()
    }

    // Inicializar el mapa
    map = L.map(mapRef.value, {
      center: [25.6866, -100.3161], // Monterrey
      zoom: 11,
      zoomControl: false // Desactivamos el control de zoom predeterminado
    })

    // Definir todas las capas base
    const layers = {
      osm: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
      }),
      satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        maxZoom: 19
      }),
      terrain: L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>',
        maxZoom: 18
      }),
      cartoDark: L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors, © CARTO',
        maxZoom: 19
      }),
      cartoLight: L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors, © CARTO',
        maxZoom: 19
      })
    }

    // Control personalizado para mostrar/ocultar capas
    const CustomLayerControl = L.Control.extend({
      options: {
        position: 'topright'
      },
      
      onAdd: function(map) {
        const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
        container.innerHTML = `
          <button 
            class="layers-toggle-btn" 
            title="Toggle Map Layers"
            style="
              width: 34px;
              height: 34px;
              background: white;
              border: 2px solid rgba(0,0,0,0.2);
              border-radius: 4px;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
            "
          >
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16zm0-11.47L17.74 9 12 13.47 6.26 9 12 4.53z"/>
            </svg>
          </button>
        `;

        container.onclick = function() {
          isLayerControlVisible.value = !isLayerControlVisible.value;
          const layerElement = document.querySelector('.leaflet-control-layers');
          if (layerElement) {
            layerElement.style.display = isLayerControlVisible.value ? 'block' : 'none';
          }
        }

        return container;
      }
    });

    // Control personalizado para el zoom
    const CustomZoomControl = L.Control.extend({
      options: {
        position: 'bottomright'
      },

      onAdd: function(map) {
        const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom-zoom');
        container.innerHTML = `
          <button class="zoom-btn zoom-in" title="Zoom In">+</button>
          <button class="zoom-btn zoom-out" title="Zoom Out">−</button>
        `;

        const zoomIn = container.querySelector('.zoom-in');
        const zoomOut = container.querySelector('.zoom-out');

        zoomIn.onclick = function() {
          map.zoomIn();
        }
        zoomOut.onclick = function() {
          map.zoomOut();
        }

        return container;
      }
    });

    // Añadir controles personalizados
    map.addControl(new CustomLayerControl());
    map.addControl(new CustomZoomControl());

    // Agrupar las capas base
    const baseMaps = {
      "Standard": layers.osm,
      "Satellite": layers.satellite,
      "Terrain": layers.terrain,
      "Dark Mode": layers.cartoDark,
      "Light Mode": layers.cartoLight
    }

    // Capa de marcadores
    const markersLayer = L.layerGroup()
    const overlayMaps = {
      "Locations": markersLayer
    }

    // Añadir capa por defecto
    layers.osm.addTo(map)

    // Crear control de capas
    layerControl = L.control.layers(baseMaps, overlayMaps, {
      collapsed: false,
      sortLayers: true
    }).addTo(map)

    // Ocultar inicialmente el control de capas
    const layerElement = document.querySelector('.leaflet-control-layers');
    if (layerElement) {
      layerElement.style.display = 'none';
    }

    // Añadir escala
    L.control.scale({
      imperial: false,
      metric: true,
      position: 'bottomleft'
    }).addTo(map)

    // Si hay datos iniciales, añadir marcadores
    if (mapData.value && mapData.value.length > 0) {
      updateMarkers()
    }
  }

  const updateMarkers = () => {
    // Limpiar marcadores existentes
    markers.forEach(marker => marker.remove())
    markers = []

    // Añadir nuevos marcadores
    if (mapData.value && mapData.value.length > 0) {
      const bounds = L.latLngBounds()

      mapData.value.forEach(point => {
        if (point.position && point.position.lat && point.position.lng) {
          // Estilo personalizado para los marcadores
          const customIcon = L.divIcon({
            className: 'custom-div-icon',
            html: `
              <div class="marker-pin" style="background-color: ${getMarkerColor(point.properties.class)};">
                <span class="marker-text">${point.properties.class}</span>
              </div>
            `,
            iconSize: [30, 42],
            iconAnchor: [15, 42]
          })

          const marker = L.marker([point.position.lat, point.position.lng], {
            icon: customIcon
          }).bindPopup(`
            <div class="custom-popup">
              <h4>${point.properties.name || 'Building'}</h4>
              <p><strong>Class:</strong> ${point.properties.class}</p>
              <p><strong>Size:</strong> ${formatNumber(point.properties.sf)} SF</p>
              <p><strong>Status:</strong> ${point.properties.status}</p>
            </div>
          `, {
            className: 'custom-popup'
          }).addTo(map)
          
          markers.push(marker)
          bounds.extend([point.position.lat, point.position.lng])
        }
      })

      // Ajustar el zoom para mostrar todos los marcadores
      if (bounds.isValid()) {
        map.fitBounds(bounds)
      }
    }
  }

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const getMarkerColor = (buildingClass) => {
    const colors = {
      'A': '#18568a',
      'B': '#04034e',
      'C': '#1b9fce'
    }
    return colors[buildingClass] || '#666666'
  }

  onUnmounted(() => {
    if (map) {
      map.remove()
      map = null
    }
  })

  const invalidateSize = () => {
    if (map) {
      map.invalidateSize()
    }
  }

  return {
    mapRef,
    initializeMap,
    updateMarkers,
    invalidateSize,
    isLayerControlVisible
  }
}
