function getWeekAndIdCard() {
  // DOM
  const week = document.querySelector('#week')
  const idCard = document.querySelector('#idCard')
  const weekStr = today.getDay();
  switch (true) {
    case weekStr === 1:
      week.textContent = '星期一'
      idCard.textContent = '1,3,5,7,9'
      break
    case weekStr === 2:
      week.textContent = '星期二'
      idCard.textContent = '0,2,4,6,8'
      break
    case weekStr === 3:
      week.textContent = '星期三'
      idCard.textContent = '1,3,5,7,9'
      break
    case weekStr === 4:
      week.textContent = '星期四'
      idCard.textContent = '0,2,4,6,8'
      break
    case weekStr === 5:
      week.textContent = '星期五'
      idCard.textContent = '1,3,5,7,9'
      break
    case weekStr === 6:
      week.textContent = '星期六'
      idCard.textContent = '0,2,4,6,8'
      break
    default:
      week.textContent = '星期日'
      idCard.textContent = '不限制'
      break
  }
};