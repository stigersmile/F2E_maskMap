function buildMap() {
  _map = L.map('mapId', {
    center: [25.04828, 121.51435],
    zoom: 12,
    zoomControl: false
  });
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}
  ).addTo(_map)
  const customZoom = new L.Control.Zoom({ position: 'topright' }).addTo(_map);
}