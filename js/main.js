// Global Değişkenler
const STATE = {
  map: null,
};

// ! Leaflet haritasının kurulumunu yap
function loadMap(position) {
  STATE.map = L.map("map", { zoomControl:false }).setView(position, 11);

  // haritaya arayüz ekle
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
  }).addTo(STATE.map);

  // Ekrana marker bas
const marker =  L.marker(position).addTo(STATE.map);

// Marker'a popup ekle
marker.bindPopup("<b>Buradasın<b/><br/>").openPopup ();

// Kontrolcüyü sağ alta taşı
L.control.zoom({position: "bottomright"}).addTo(STATE.map);
}



// Fonksiyonu çağır
loadMap([41.191133, 29.091771]);
