const upDataCounty = (importData) => {
  let str = '';
  importData.forEach((element) => {
    str += `
    <option value="${element.CityName}">
    ${element.CityName}</option>`;
  });
  county.innerHTML = str;
};
