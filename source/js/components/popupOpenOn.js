function popupOpenOn(importData) {
  const lat = importData[0].geometry.coordinates[1]
  const lng = importData[0].geometry.coordinates[0]
  // 判斷 background-color
  const adultStockNoMore = (function () {
    if (importData[0].properties.mask_adult === 0) {
      return 'h-bg-info'
    } else {
      return 'h-bg-primary'
    }
  })()
  const childStockNoMore = (function () {
    if (importData[0].properties.mask_child === 0) {
      return 'h-bg-info'
    } else {
      return 'h-bg-secondary'
    }
  })()
  _map.setView([lat, lng], 16)
  L.popup()
    .setLatLng([lat, lng])
    .setContent(`
    <div class="p-card">
      <div class="h-d-flex h-mb-3 h-align-items-center">
        <h2 class="h-flex-1">${importData[0].properties.name}</h2>
        <a class="fas fa-location-arrow h-mr-3" href="https://www.google.com.tw/maps/dir//${importData[0].properties.address}" target="_blank"></a>
      </div>
      <span class="h4 h-text-dark">${importData[0].properties.address}</span>
      <br>
      <span class="h4 h-text-dark">${importData[0].properties.phone}</span>
      <br>
      <span class="h4 h-text-dark">${importData[0].properties.note}</span>
      <div class="h-d-flex h-mt-2">
        <div class="p-badges ${adultStockNoMore}"><span class="h4 h-flex-1">成人口罩</span><span>${importData[0].properties.mask_adult}</span></div>
        <div class="p-badges ${childStockNoMore}"><span class="h4 h-flex-1">兒童口罩</span><span>${importData[0].properties.mask_child}</span></div>
      </div>
    </div>
  `)
    .openOn(_map);
}