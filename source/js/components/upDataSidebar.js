function upDataSidebar(importData) {
  let str = '';
  for (let i = 0; importData.length > i; i++) {
    const adultStockNoMore = (function () {
      if (importData[i].properties.mask_adult === 0) {
        return 'h-bg-info'
      } else {
        return 'h-bg-primary'
      }
    })()
    const childStockNoMore = (function () {
      if (importData[i].properties.mask_child === 0) {
        return 'h-bg-info'
      } else {
        return 'h-bg-secondary'
      }
    })()
    str += `
		<div class="p-card">
			<div class="h-d-flex h-mb-3 h-align-items-center">
				<h2 class="h-flex-1">${importData[i].properties.name}</h2>
				<a class="h1 h-text-primary fas fa-eye h-mr-3" id="path" href="#"
				data-lat = "${importData[i].geometry.coordinates[1]}"
				data-lng = "${importData[i].geometry.coordinates[0]}"
				data-name = "${importData[i].properties.name}"
				data-address = "${importData[i].properties.address}"
				data-phone = "${importData[i].properties.phone}"
				data-note = "${importData[i].properties.note}"
				data-adult = "${importData[i].properties.mask_adult}"
				data-child = "${importData[i].properties.mask_child}"
				></a>
				<a class="fas fa-location-arrow" href="https://www.google.com.tw/maps/dir//${importData[i].properties.address}" target="_blank"></a>
			</div>
			<span class="h4 h-text-dark">${importData[i].properties.address}</span>
			<br>
			<span class="h4 h-text-dark">${importData[i].properties.phone}</span>
			<br>
			<span class="h4 h-text-dark">${importData[i].properties.note}</span>
			<br>
			<div class="h-d-flex h-mt-2">
				<div class="p-badges ${adultStockNoMore}"><span class="h5 h-flex-1">成人口罩</span><span>${importData[i].properties.mask_adult}</span></div>
				<div class="p-badges ${childStockNoMore}"><span class="h5 h-flex-1">兒童口罩</span><span>${importData[i].properties.mask_child}</span></div>
			</div>
		</div>
		`
  }
  sideData.innerHTML = str
}