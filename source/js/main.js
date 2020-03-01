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
// marker群組管理
const markers = new L.MarkerClusterGroup();
// let marker;

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
      // 以資料庫為參數帶入
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
  // 以資料庫為參數帶入
  upDataTown(areaData);
  if (pharmacyData.length === 0) {
    return alert('查無資料 (o´罒`o)');
  }
  const lat = pharmacyData[0].geometry.coordinates[1];
  const lng = pharmacyData[0].geometry.coordinates[0];
  upDataSidebar(pharmacyData);
  markerOpen(lat, lng);
};

const changeTown = e => {
  // 預設選項第一個會是全部地區
  if (e.target.value === '全部地區') {
    const pharmacyData = data.filter(element =>
      element.properties.address.match(selectedCounty)
    );
    const lat = pharmacyData[0].geometry.coordinates[1];
    const lng = pharmacyData[0].geometry.coordinates[0];
    // 以資料庫為參數帶入
    upDataSidebar(pharmacyData);
    markerOpen(lat, lng);
  } else {
    // 已選擇 城市 + 已選擇 地區
    const countyAndTownStr = selectedCounty + e.target.value;
    const pharmacyData = data.filter(element =>
      element.properties.address.match(countyAndTownStr)
    );
    const lat = pharmacyData[0].geometry.coordinates[1];
    const lng = pharmacyData[0].geometry.coordinates[0];
    // 以資料庫為參數帶入
    upDataSidebar(pharmacyData);
    markerOpen(lat, lng);
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
  const lat = Number(e.target.dataset.lat);
  const lng = Number(e.target.dataset.lng);
  // 以資料庫為參數帶入
  markerOpen(lat, lng);
  if (innerWidth < 768) {
    sideBarOpenAndClose();
  }
};

county.addEventListener('change', changeCounty);
countyTown.addEventListener('change', changeTown);
search.addEventListener('click', searchAddress);
sideData.addEventListener('click', clickBar);
sideBarSwitchBtn.addEventListener('click', sideBarOpenAndClose);
