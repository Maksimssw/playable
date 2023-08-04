import { Plinko } from "./game";
import './assets/css/style.css'

const basket = [
  76,
  43,
  7,
  4,
  0.4,
  0.2,
  0.4,
  4,
  7,
  43,
  76,
];

const plinko = Plinko(document.body.querySelector("#plinko"));

plinko.map(basket);

const playButton = document.querySelector('.addBall')

playButton.addEventListener('click', () => {
  plinko.Balance(0)
  const random = (Math.random() * (1.3 - 0.8) + 0.8).toFixed(1)
  console.log(random)
  plinko.add(+random)
})
