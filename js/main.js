import { ui, personIcon } from "./ui.js";

// Global Değişkenler
const STATE = {
  map: null,
  layer: null,
  clickedCoords: null,
  notes:[],
};

// Kullanıcının konumuna göre haritayı yükle
window.navigator.geolocation.getCurrentPosition(
  // Kullanıcı iizn verirse onun olduğu konuma
  (e) => loadMap([e.coords.latitude, e.coords.longitude]),
  // izin vermezse varsayılan olarak İstanbul odaklı yükle
  () => loadMap([41.104187, 29.051014])
);

//  Leaflet haritasının kurulumunu yap
function loadMap(position) {
  STATE.map = L.map("map", { zoomControl: false }).setView(position, 11);

  // haritaya arayüz ekle
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
  }).addTo(STATE.map);

  // Kontrolcüyü sağ alta taşı
  L.control.zoom({ position: "bottomright" }).addTo(STATE.map);

  // Harita üzerine bir layer oluştur
  STATE.layer = L.layerGroup().addTo(STATE.map);

  // Ekrana marker bas
  const marker = L.marker(position, { icon: personIcon }).addTo(STATE.map);

  // Marker'a popup ekle
  marker.bindPopup("<b>Buradasın<b/><br/>");

  // Haritaya tıklanma olayı  için izleyici ekle
  STATE.map.on("click", onMapClick);
};

// Haritaya tıklanınca çalışır
function onMapClick(e) {
  STATE.coords = [e.latlng.lat, e.latlng.lng];

  // Aside alanındaki formu aktif hale getir
  ui.aside.classList.add("add");

  // Aside alanındaki başlığı güncelle
  ui.asideTitle.textContent = "Yeni Not";
};

// İptal butonuna basınca 
ui.cancelButton.addEventListener("click", () => {
    // aside alanını ekleme modundan çıkar
    ui.aside.classList.remove("add");

    // Title'ı eski haline getir
    ui.asideTitle.textContent = "Notlar";
});

// Ok'a tıklanınca aside alanını aç/kapa
ui.arrow.addEventListener("click", ()=> {
    ui.aside.classList.toggle("hide");
});


// Form gönderilince
ui.form.addEventListener("submit", (e) => {
    // Sayfa yenilemeyi engelle
    e.preventDefault();

    // Formdaki verilere eriş
    const title = e.target[0].value;
    const date = e.target[1].value;
     const statu = e.target[2].value;


     // Eğer form doldurulmadıysa kullanıcıya uyarı ver
     if(!title || !date || !status) {
       return alert ("Lütfen formu doldurunuz!");
     };

     // Kaydedilecek nesneyi oluştur
     const newNote = {
        id: new Date().getTime(),
        title,
        date,
        status,
        coords: STATE.clickedCoords,
     };


      console.log(newNote);
});
