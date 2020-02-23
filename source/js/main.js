/**
 * DOM
 */

const _county = document.querySelector('#county');
const _countyTown = document.querySelector('#countyTown')
const _sideBarSwitchBtn = document.querySelector('#btnId')
const _sideData = document.querySelector('#sideData')
const _search = document.querySelector('#search')


/**
 * Model
 */

const _data = [];
let _map = {};

/**
 * init
 */

(function ajaxGetData() {
  const request = new XMLHttpRequest();
  request.open('get', 'https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json');
  request.send(null);
  request.onload = () => {
    // 如果回應已完成 4 並且已成功 200 。
    if (request.readyState === 4 && request.status === 200) {
      // 以 JSON 解析字串轉為物件
      const json = JSON.parse(request.responseText);
      // 抓取資料層陣列長度
      const jsonLen = json.features.length;
      // 使用 for 迴圈 以索引值 push 到 allData 全地區資料庫
      for (let i = 0; jsonLen > i; i++) {
        _data.push(json.features[i]);
      }
    }
    const areaData = area.filter(function (element) {
      return element.CityName === '臺北市'
    })
    const pharmacyData = _data.filter(function (element) {
      return element.properties.town === '中正區'
        && element.properties.county === '臺北市'
    })
    upDataCounty(area)
    upDataTown(areaData)
    // 參數帶入資料庫
    upDataSidebar(pharmacyData)
    buildMap()
    addMarker(_data)
  }
})()

/**
 * Controller
 */

function sideBarOpenAndClose() {
  const bar = document.querySelector('.p-sidebar')
  const map = document.querySelector('#mapId')
  bar.classList.toggle('active')
  map.classList.toggle('active')
}

function changeCounty(e) {
  // 藥局資料庫不全使用外部資料 data.js
  const areaData = area.filter(function (element) {
    return element.CityName === e.target.value
  })
  const pharmacyData = _data.filter(function (element) {
    return element.properties.county === e.target.value
  })
  upDataTown(areaData)
  // 刪除 l.Marker 圖層
  removerMarker()
  // 參數帶入資料庫
  upDataSidebar(pharmacyData)
  addMarker(pharmacyData)
  popupOpenOn(pharmacyData)
}

function changeTown(e) {
  const pharmacyData = _data.filter(function (element) {
    return element.properties.town === e.target.value
  })
  // 刪除 l.Marker 圖層
  removerMarker()
  // 參數帶入資料庫
  upDataSidebar(pharmacyData)
  addMarker(pharmacyData)
  popupOpenOn(pharmacyData)
}

function searchAddress(e) {
  // 阻止元素默認的行為
  // e.preventDefault();
  if (e.target.nodeName !== 'A') { return }
  const searchText = document.querySelector('#searchText').value
  if (searchText === '') { return alert('請輸入資料，無法搜尋空白。') }
  const pharmacyData = _data.filter(function (element) {
    return element.properties.address.match(searchText)
  })
  upDataSidebar(pharmacyData)
}

function clickBar(e) {
  if (e.target.id !== 'path') { return }
  // 阻止元素默認的行為
  e.preventDefault();
  const lat = e.target.dataset.lat;
  const lng = e.target.dataset.lng;
  const name = e.target.dataset.name
  const address = e.target.dataset.address
  const phone = e.target.dataset.phone
  const note = e.target.dataset.note
  const adult = e.target.dataset.adult
  const child = e.target.dataset.child
  const adultStockNoMore = (function () {
    if (adult === 0) {
      return 'h-bg-info'
    } else {
      return 'h-bg-primary'
    }
  })()
  const childStockNoMore = (function () {
    if (child === 0) {
      return 'h-bg-info'
    } else {
      return 'h-bg-secondary'
    }
  })()
  _map.panTo([lat, lng]).setZoom(18)
  L.popup()
    .setLatLng([lat, lng])
    .setContent(`
		<div class="p-card">
			<div class="h-d-flex h-mb-3 h-align-items-center">
				<h2 class="h-flex-1">${name}</h2>
				<a class="fas fa-location-arrow h-mr-3" href="https://www.google.com.tw/maps/dir//${address}" target="_blank"></a>
			</div>
			<span class="h4 h-text-dark">${address}</span>
			<br>
			<span class="h4 h-text-dark">${phone}</span>
			<br>
			<span class="h4 h-text-dark">${note}</span>
			<div class="h-d-flex h-mt-2">
				<div class="p-badges ${adultStockNoMore}"><span class="h5 h-flex-1">成人口罩</span><span>${adult}</span></div>
				<div class="p-badges ${childStockNoMore}"><span class="h5 h-flex-1">兒童口罩</span><span>${child}</span></div>
			</div>
		</div>
		`)
    .openOn(_map);
}

_county.addEventListener('change', changeCounty)
_countyTown.addEventListener('change', changeTown)
_search.addEventListener('click', searchAddress)
_sideData.addEventListener('click', clickBar)

_sideBarSwitchBtn.addEventListener('click', sideBarOpenAndClose)