import { onMounted, onUnmounted, ref, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'


export const useMapControl = (mapData) => {
  const mapRef = ref(null)
  let map = null
  let markers = []

  const initializeMap = () => {
    if (!mapRef.value) return

    // Asegurarnos de que el mapa no se inicialice múltiples veces
    if (map) {
      map.remove()
    }

    // Inicializar el mapa
    map = L.map(mapRef.value, {
      center: [25.6866, -100.3161], // Coordenadas de Monterrey como ejemplo
      zoom: 11,
    })

    // Añadir el tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
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
          const marker = L.marker([point.position.lat, point.position.lng])
            .bindPopup(`
              <strong>${point.properties.name || 'Building'}</strong><br>
              Class: ${point.properties.class}<br>
              Size: ${point.properties.sf} SF
            `)
            .addTo(map)
          
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

  // Limpiar mapa cuando el componente se desmonta
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
    invalidateSize
  }
}

