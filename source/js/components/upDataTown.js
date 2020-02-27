const upDataTown = importData => {
  let str = `<option value="全部地區">全部地區</option>`;
  importData[0].AreaList.forEach(element => {
    str += `
    <option value="${element.AreaName}">
    ${element.AreaName}</option>
    `;
  });
  countyTown.innerHTML = str;
};
