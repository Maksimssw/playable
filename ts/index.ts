import "./assets/fonts/fonts.css";
import "./assets/css/style.css";
import "./assets/css/index.css";


const sliderWrapper = document.querySelector('.slider__wrapper') as HTMLDivElement
const sliderItem = document.querySelectorAll('.slider__item') as NodeListOf<HTMLDivElement>

const widthItem: number = sliderWrapper.offsetWidth / 3
let scrollX: number = 0
let scrollI: number = 0

sliderItem.forEach(item => {
  item.style.width = widthItem + 'px'
  const answers = item.querySelectorAll('.answers__item') as NodeListOf<HTMLLIElement>

  answers.forEach(answer => {
    answer.addEventListener('click', () => {
      answerHandler(answer, item)
    })
  })
})

const answerHandler = (answer: HTMLLIElement, item: HTMLDivElement) => {
  answer.classList.add('answers__item_click')
  const value = answer.textContent

  setTimeout(() => {
    answer.classList.remove('answers__item_click')

    if (isNextSlider) {
      scrollI += 1
      scrollX += widthItem
      nextSlider(item)
    }
  }, 500)

  let isNextSlider: boolean;

  if (value) {
    if (
      value === 'Зеленый' ||
      value === 'Обгон запрещен' ||
      value === '60 км/ч'
    ) {
      answer.classList.add('answers__item_true')
      isNextSlider = true
    } else {
      answer.classList.add('answers__item_false')
      isNextSlider = false
    }
  }
}

const nextSlider = (item: HTMLDivElement) => {
  sliderWrapper.style.transform = `translateX(-${scrollX}px)`
}