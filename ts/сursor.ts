const cursorBtn = document.querySelector('.cursor') as HTMLLIElement
const cursor = document.querySelector('.cursor-img') as HTMLImageElement

const coord = cursorBtn.getBoundingClientRect();
console.log(coord)

cursor.style.top = coord.top + coord.height / 2 - (cursor.offsetHeight / 4) + 'px'
cursor.style.left = coord.left + coord.width / 2 + (cursor.offsetWidth / 2) + 'px'

cursorBtn.addEventListener('click', () => {
  cursor.style.display = 'none'
})