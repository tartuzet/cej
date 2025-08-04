// Inicializar mapa
const map = L.map('map').setView([18.9, -99.17], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

let markers = [];
let userLatLng = null; // Guardar ubicación del usuario

const churchIcon = L.icon({
    iconUrl: 'src/assets/gps.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -35]
});

function renderChurches(filter = "") {
    const listContainer = document.getElementById('churchList');
    listContainer.innerHTML = "";
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];

    // Filtrar por activo y texto
    const filtered = churchesData.places.filter(place =>
        place.active && (
            place.popUp.toLowerCase().includes(filter.toLowerCase()) ||
            place.address.toLowerCase().includes(filter.toLowerCase())
        )
    );

    // Actualizar contador dinámico
    const totalActivas = churchesData.places.filter(p => p.active).length;
    document.getElementById('totalCount').textContent =
        `${filtered.length} de ${totalActivas} Iglesias afiliadas`;

    // Mensaje si no hay resultados
    if (filtered.length === 0) {
        const noResult = document.createElement("div");
        noResult.className = "list-group-item text-center text-muted";
        noResult.textContent = "No se encontraron Iglesias con ese criterio.";
        listContainer.appendChild(noResult);
        return;
    }

    // Si hay un resultado único, centrar
    if (filtered.length === 1) {
        map.setView(filtered[0].geocode, 15);
    }

    // Crear marcadores
    filtered.forEach(place => {
        const marker = L.marker(place.geocode, { icon: churchIcon }).addTo(map);
        markers.push(marker);

        // Botón abrir en Google Maps
        const googleMapsUrl = `https://www.google.com/maps?q=${place.geocode[0]},${place.geocode[1]}`;

        const popupContent = `
            <div class="text-center">
                <img src="${place.logoName}" alt="${place.popUp}">
                <h6 class="mt-2 mb-1">${place.popUp}</h6>
                <small>${place.address}</small><br>
                ${place.phone ? `<a href="tel:${place.phone}" class="btn btn-sm mt-2" style="background-color:#007bff;color:white;border:none;">Llamar</a>` : ""}
                <a href="${googleMapsUrl}" target="_blank" class="btn btn-sm mt-2" style="background-color:#28a745;color:white;border:none;">Abrir en Google Maps</a>
            </div>
        `;
        marker.bindPopup(popupContent);

        // Añadir a la lista
        const listItem = document.createElement("a");
        listItem.href = "#";
        listItem.className = "list-group-item list-group-item-action";
        listItem.innerHTML = `<strong>${place.popUp}</strong><br><small>${place.address}</small>`;
        listItem.addEventListener("click", () => {
            map.setView(place.geocode, 16);
            marker.openPopup();
        });
        listContainer.appendChild(listItem);
    });
}

// Búsqueda en tiempo real
document.getElementById('searchInput').addEventListener('input', (e) => {
    renderChurches(e.target.value);
});

// Detectar ubicación
function detectarUbicacion() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            userLatLng = [pos.coords.latitude, pos.coords.longitude];

            L.marker(userLatLng, {icon: L.icon({
                iconUrl: 'https://cdn-icons-png.flaticon.com/512/64/64113.png',
                iconSize: [30, 30]
            })}).addTo(map).bindPopup("Estás aquí").openPopup();

            // Calcular iglesia más cercana
            let nearest = null;
            let minDist = Infinity;

            churchesData.places.filter(p => p.active).forEach(place => {
                const dist = haversine(userLatLng, place.geocode);
                if (dist < minDist) {
                    minDist = dist;
                    nearest = place;
                }
            });

            if (nearest) {
                map.setView(nearest.geocode, 14);
                alert(`La iglesia más cercana es: ${nearest.popUp} (${minDist.toFixed(2)} km)`);
            }

        }, () => {
            console.warn("No se pudo obtener la ubicación del usuario");
        });
    }
}

// Botón flotante para centrar en tu ubicación
document.getElementById('btn-location').addEventListener('click', () => {
    if (userLatLng) {
        map.setView(userLatLng, 14);
    } else {
        alert("Ubicación no detectada aún");
    }
});

renderChurches();
detectarUbicacion();

function haversine(coord1, coord2) {
    const R = 6371;
    const dLat = (coord2[0] - coord1[0]) * Math.PI / 180;
    const dLon = (coord2[1] - coord1[1]) * Math.PI / 180;
    const lat1 = coord1[0] * Math.PI / 180;
    const lat2 = coord2[0] * Math.PI / 180;

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}
