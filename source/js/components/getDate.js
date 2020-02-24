function getDate() {
  // DOM
  const date = document.querySelector('#date')
  const today = new Date()
  // model
  let month = (() => {
    const value = today.getMonth() + 1;
    if (value > 9) {
      return value
    } else {
      return '0' + value
    }
  })()
  // view

  const dateStr = `${today.getFullYear()}-${month}-${today.getDate()}`
  console.log(dateStr)
  date.textContent = dateStr
}