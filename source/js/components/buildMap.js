function buildMap() {
  _map = L.map('mapId', {
    center: [25.04828, 121.51435],
    zoom: 16,
  });
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}
  ).addTo(_map)
  // 使用 control.locate 套件
  L.control.locate({
    showPopup: false,
    flyTo: true
  }).addTo(_map).start();
}