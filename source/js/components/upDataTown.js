function upDataTown(areaData) {
  let str = '';
  for (let i = 0; i < areaData[0].AreaList.length; i++) {
    str += `
		<option style="border-radius: 20px" value="${areaData[0].AreaList[i].AreaName}">
		${areaData[0].AreaList[i].AreaName}</option>
		`
  }
  countyTown.innerHTML = str;
};