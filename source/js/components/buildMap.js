const buildMap = () => {
  map = L.map('mapId', {
    center: [25.04828, 121.51435],
    zoom: 16
  });
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '作者 Albert || 設計師 Wendy '
  }).addTo(map);
  // 使用 control.locate 套件
  L.control
    .locate({
      showPopup: false
    })
    .addTo(map)
    .start();
};
