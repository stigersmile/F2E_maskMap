function upDataCounty(areaData) {
  let str = '';
  for (let i = 0; i < areaData.length; i++) {
    str += `
		<option style="border-radius: 20px" value="${areaData[i].CityName}">${areaData[i].CityName}</option>
		`
  }
  county.innerHTML = str;
};