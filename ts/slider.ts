import "./сursor"

const sliderPlay = () => {
  const slider = document.querySelector('.slider') as HTMLDivElement
  const sliderWrapper = slider.querySelector('.slider__wrapper') as HTMLDivElement
  const sliderItem = slider.querySelectorAll('.slider__item') as NodeListOf<HTMLDivElement>

  const winsWrapper = document.querySelector('.wins') as HTMLDivElement

  const widthItem: number = sliderWrapper.offsetWidth / 3
  let scrollX: number = 0
  let scrollI: number = 0

  sliderItem.forEach(item => {
    item.style.width = widthItem + 'px'
    const answers = item.querySelectorAll('.answers__item') as NodeListOf<HTMLLIElement>

    answers.forEach(answer => {
      answer.addEventListener('click', () => {
        answerHandler(answer)
      })
    })
  })

  const answerHandler = (answer: HTMLLIElement) => {
    answer.classList.add('answers__item_click')
    const value = answer.textContent

    setTimeout(() => {
      answer.classList.remove('answers__item_click')

      if (isNextSlider) {
        scrollI += 1
        scrollX += widthItem

        winsView()
        if (scrollI !== 3) nextSlider()
      }
    }, 500)

    let isNextSlider: boolean;

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

  const nextSlider = () => {
    sliderWrapper.style.transform = `translateX(-${scrollX}px)`
  }

  const coin = winsWrapper.querySelector('.coin') as HTMLDivElement
  const headline = winsWrapper.querySelector('.wins__headline') as HTMLElement
  const content = winsWrapper.querySelector('.wins__content') as HTMLElement

  const winsView = () => {
    if (scrollI === 1) {
      winsWrapper.classList.add('wins_one')

      setTimeout(() => {
        coin.classList.add('coin_one')
      }, 300)

      return
    }

    if (scrollI === 2) {
      winsWrapper.classList.add('wins_two')
      coin.classList.add('coin_two')
    }

    if (scrollI === 3) {
      winsWrapper.classList.add('wins_free')
      coin.classList.add('coin_free')
      slider.classList.add('slider_up')

      setTimeout(() => {
        headline.classList.add('wins__headline_vis')
        content.classList.add('wins__content_vis')
      }, 400)
    }
  }
}

export default sliderPlay