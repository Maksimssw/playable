const cursor = document.querySelector('.cursor-img') as HTMLLIElement

const cursorCordHandler = (x: number, y: number) => {
  cursor.style.left = x + 'px'
  cursor.style.top = y + 'px'
}

window.addEventListener('touchstart', (event) => {
  cursor.classList.add('cursor_click')

  cursorCordHandler(event.touches[0].clientX, event.touches[0].clientY)
})

window.addEventListener('touchmove', (event) => {
  cursor.classList.add('cursor_click')
})

window.addEventListener('touchend', (event) => {
  cursor.classList.remove('cursor_click')
})