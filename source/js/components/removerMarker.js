function removerMarker() {
  _map.eachLayer(function (layer) {
    if (layer instanceof L.Marker) {
      _map.removeLayer(layer)
    }
  });
}