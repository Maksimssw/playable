import { Plinko } from "./game";
import "./assets/fonts/fonts.css";
import "./assets/css/style.css";

const launch = () => {
  const basket = [410, 260, 210, 83, 24, 11, 24, 83, 210, 260, 410];
  const plinko = Plinko();

  plinko.map(basket);

  let index = 0
  const createAdd = setInterval(() => {
    if (index === 6) clearInterval(createAdd)
    index += 1
    plinko.Balance(0);
    const random = (Math.random() * (1.3 - 0.8) + 0.8).toFixed(1);
    plinko.add(+random);
  }, 400)

 
  let ipad = false
  let minTel = false

  const appWrapper = document.querySelector('.app-wrapper')
  const canvas = appWrapper.querySelector('.plinko')

  const sizeCanvas = (boolean) => {
    if (minTel) {
      canvas.style.width = 14 + 'rem'
      canvas.style.height = 14 + 'rem'
      return
    }

    if (boolean) {
      canvas.style.width = 32 + 'rem'
      canvas.style.height = 29.5 + 'rem'
      
      appWrapper.classList.remove('app-wrapper-ipad')
    } else {
      canvas.style.width = 38 + 'rem'
      canvas.style.height = 36 + 'rem'
      if (ipad) appWrapper.classList.add('app-wrapper-ipad')
    }

    if (ipad) {
      canvas.style.width = 22 + 'rem'
      canvas.style.height = 20 + 'rem'
    }
  }

  const turnTel = (size) => {
    const width = size.width
    const height = size.height

    if (width <= 230 || height <= 230) {
      minTel = true
      appWrapper.classList.add('.app-wrapper-min')
    } else {
      minTel = false
      appWrapper.classList.remove('.app-wrapper-min')
    }

    width > 700 ? ipad = true : false

    if (width > height) {
      appWrapper.classList.add('app-wrapper_column')
      sizeCanvas(true)
    } else {
      appWrapper.classList.remove('app-wrapper_column')
      sizeCanvas(true)
    }

    if (width <= 470) {
      canvas.style.width = 27 + 'rem'
      canvas.style.height = 24 + 'rem'
    }
  }

  turnTel({
    width: window.innerWidth,
    height: window.innerHeight
  })

  window.addEventListener("orientationchange", (event) => {
    setTimeout(() => {
      turnTel({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }, 10)
  });
};
launch()
