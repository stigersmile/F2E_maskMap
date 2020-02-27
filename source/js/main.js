/**
 * DOM
 */

const county = document.querySelector('#county');
const countyTown = document.querySelector('#countyTown');
const sideBarSwitchBtn = document.querySelector('#btnId');
const sideData = document.querySelector('#sideData');
const search = document.querySelector('#search');

/**
 * Model
 */

const data = [];
const map = {};
let selectedCounty = '台北市';

/**
 * init
 */

(() => {
  const request = new XMLHttpRequest();
  request.open(
    'get',
    'https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json'
  );
  request.send(null);
  request.onreadystatechange = () => {
    // 如果回應已完成 4 並且已成功 200 。
    if (request.readyState === 4 && request.status === 200) {
      // 以 JSON 解析字串轉為物件
      const json = JSON.parse(request.responseText);
      // 使用 forEach 迴圈 以抓出每筆資料 push 到 資料庫
      json.features.forEach(element => data.push(element));
      const areaData = area.filter(
        element => element.CityName === selectedCounty
      );
      // 預設未使用定位是會抓取 selectedCounty 資料
      // 移動至 selectedCounty 陣列第 0 筆 經緯度F
      const pharmacyData = data.filter(element =>
        element.properties.address.match(selectedCounty)
      );
      getDate();
      getWeekAndIdCard();
      upDataCounty(area);
      upDataTown(areaData);
      // 參數帶入資料庫
      upDataSidebar(pharmacyData);
      buildMap();
      addMarker(data);
      const loading = document.querySelector('.c-loading');
      loading.setAttribute('style', 'display: none');
    }
  };
})();

/**
 * Controller
 */

const sideBarOpenAndClose = () => {
  const bar = document.querySelector('.p-sidebar');
  const map = document.querySelector('#mapId');
  bar.classList.toggle('active');
  map.classList.toggle('active');
};

const changeCounty = e => {
  // 已選擇城市
  selectedCounty = e.target.value;
  // 藥局資料庫不全使用外部資料 data.js
  const areaData = area.filter(element => element.CityName === selectedCounty);
  const pharmacyData = data.filter(element =>
    // 以地址欄搜尋 selectedCounty 字串
    element.properties.address.match(selectedCounty)
  );
  // 參數帶入資料庫
  upDataTown(areaData);
  if (pharmacyData.length === 0) {
    return alert('查無資料 (o´罒`o)');
  }
  upDataSidebar(pharmacyData);
  popupOpenOn(pharmacyData);
};

const changeTown = e => {
  // 預設選項第一個會是全部地區
  if (e.target.value === '全部地區') {
    const pharmacyData = data.filter(element =>
      element.properties.address.match(selectedCounty)
    );
    // 參數帶入資料庫
    upDataSidebar(pharmacyData);
    popupOpenOn(pharmacyData);
  } else {
    // 已選擇 城市 + 已選擇 地區
    const countyAndTownStr = selectedCounty + e.target.value;
    const pharmacyData = data.filter(element =>
      element.properties.address.match(countyAndTownStr)
    );
    // 參數帶入資料庫
    upDataSidebar(pharmacyData);
    popupOpenOn(pharmacyData);
  }
};

const searchAddress = e => {
  // 阻止元素默認的行為
  // e.preventDefault();
  if (e.target.nodeName !== 'A') {
    return;
  }
  const searchText = document.querySelector('#searchText').value;
  if (searchText === '') {
    return alert('請輸入資料，無法搜尋空白。');
  }
  const pharmacyData = data.filter(element =>
    element.properties.address.match(searchText)
  );
  upDataSidebar(pharmacyData);
};

const clickBar = e => {
  if (e.target.id !== 'path') {
    return;
  }
  // 阻止元素默認的行為
  e.preventDefault();
  const lat = e.target.dataset.lat;
  const lng = e.target.dataset.lng;
  const name = e.target.dataset.name;
  const address = e.target.dataset.address;
  const phone = e.target.dataset.phone;
  const note = e.target.dataset.note;
  const adult = e.target.dataset.adult;
  const child = e.target.dataset.child;
  const adultStockNoMore = (() => {
    if (adult === 0) {
      return 'h-bg-info';
    } else {
      return 'h-bg-primary';
    }
  })();
  const childStockNoMore = (() => {
    if (child === 0) {
      return 'h-bg-info';
    } else {
      return 'h-bg-secondary';
    }
  })();
  map.setView([lat, lng], 16);
  L.popup()
    .setLatLng([lat, lng])
    .setContent(
      `
		<div class="p-card" style="max-width: 200px">
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
		`
    )
    .openOn(map);
  if (innerWidth < 768) {
    sideBarOpenAndClose();
  }
};

county.addEventListener('change', changeCounty);
countyTown.addEventListener('change', changeTown);
search.addEventListener('click', searchAddress);
sideData.addEventListener('click', clickBar);
sideBarSwitchBtn.addEventListener('click', sideBarOpenAndClose);
